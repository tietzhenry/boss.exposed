import { decrypt } from "@/lib/crypto";
import prisma from "@/lib/prisma";
import { serverEnv } from "@/utils/env/server";
import { Session } from "@prisma/client";
import { Elysia, InternalServerError, t } from "elysia";

export const userRoute = new Elysia({ prefix: "/user" })
  .get(
    "/current",
    async (ctx) => {
      const sessionToken = await decrypt<Session>(ctx.cookie[serverEnv.AUTH_COOKIE].value);

      if (!sessionToken || typeof sessionToken !== "string") {
        throw new InternalServerError("Invalid session token");
      }

      const session = await prisma.session.findFirst({
        where: { sessionToken: sessionToken },
      });
      if (!session) throw new InternalServerError("Session not found");

      const user = await prisma.user.findFirst({
        where: { id: session.userId },
        include: {
          customization: {
            include: {
              general: true,
              assets: true,
              color: true,
              other: true,
              user: true
            }
          },
        }
      });
      if (!user) throw new InternalServerError("User not found");

      const mobileProfileViews = await prisma.mobileProfileView.findMany({
        where: { userId: user.id },
        select: { viewedAt: true }, 
      });

      const desktopProfileViews = await prisma.desktopProfileView.findMany({
        where: { userId: user.id },
        select: { viewedAt: true }, 
      });

      const totalProfileViews = mobileProfileViews.length + desktopProfileViews.length;

      return {
        ...user,
        profileViews: totalProfileViews, 
        mobileProfileViews: mobileProfileViews.map((view) => ({
          viewedAt: view.viewedAt.toISOString().slice(11, 16), 
        })),
        desktopProfileViews: desktopProfileViews.map((view) => ({
          viewedAt: view.viewedAt.toISOString().slice(11, 16), 
        })),
      };
    }
  );
