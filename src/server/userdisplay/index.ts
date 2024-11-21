import prisma from "@/lib/prisma";
import Elysia, { NotFoundError } from "elysia";

export const userdisplayroute = new Elysia({ prefix: "/userdisplay" }).get(
  "/username/:username",
  async ({ params: { username } }) => {
    const user = await prisma.user.findFirst({
      where: { username },
      include: {
        mobileProfileViews: true,
        desktopProfileViews: true,
        customization: {
          include: {
            assets: true,
            general: true,
            color: true,
            other: true,
          },
        },
        userBadges: true,
        socialMediaLinks: true,
      },
    });

    if (!user) {
      throw new NotFoundError("The user was not found");
    }
    const totalViews =
      user.mobileProfileViews.length + user.desktopProfileViews.length;

    return {
      alias: user.alias,
      username: user.username,
      uid: user.userCount,
      customization: user.customization,
      userBadges: user.userBadges,
      socialMediaLinks: user.socialMediaLinks,
      totalViews,
    };
  }
);
