import prisma from "@/lib/prisma";
import { AssetService } from "@/lib/services/AssetService";
import { UserService } from "@/lib/services/UserService";
import { serverEnv } from "@/utils/env/server";
import Elysia, { InternalServerError, t } from "elysia";
import { UploadType } from "../../../../types";

export const assetsUploaderRoute = new Elysia({ prefix: "/customize" })
  .get("/assets", async (ctx) => {
    const user = await UserService.retrieveUser(
      ctx.cookie[serverEnv.AUTH_COOKIE].value as string,
    );

    if (!user) throw new InternalServerError("Benutzer nicht gefunden");

    const customization = await prisma.customization.findFirst({
      where: {
        userId: user.id
      }
    })

    if(customization){
      return await prisma.assets.findFirst({
        where: {
          customization: customization
        },
      })
    }
  })

  .post(
    "/assets/background",
    async (ctx) => {
      const user = await UserService.retrieveUser(
        ctx.cookie[serverEnv.AUTH_COOKIE].value as string,
      );
      if (!user) throw new InternalServerError("User not found");

      const file = await ctx.body.background;

      if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
        throw new InternalServerError(
          "Invalid file type. Only images and videos are allowed.",
        );
      }
      await AssetService.uploadAsset(user, file, UploadType.background)
    },
    {
      body: t.Object({
        background: t.File({
          type: [
            "image/png",
            "image/jpeg",
            "image/gif",
            "image/webp",
            "image/svg+xml",
            "video/mp4",
            "video/webm",
            "video/ogg",
          ],
        }),
      }),
    },
  );
