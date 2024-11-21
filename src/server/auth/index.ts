import prisma from "@/lib/prisma";
import { serverEnv } from "@/utils/env/server";
import { Elysia, InternalServerError } from "elysia";
import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";
import { signInUser, signUpUser } from "@/lib/typebox/auth";
import { encrypt, decrypt } from "@/lib/crypto"; 
import { Session } from "@prisma/client";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const authRoute = new Elysia({ prefix: "/auth" })
  .post(
    "/signup",
    async (ctx) => {
      const trimmedUsername = ctx.body.username.trim();
      const trimmedEmail = ctx.body.email.trim();
      const password = ctx.body.password.trim();

      if (!password) {
        throw new Error("Password is required");
      }

      if (!emailPattern.test(trimmedEmail)) {
        throw new Error("Invalid email format");
      }

      const userExist = await prisma.user.findFirst({
        where: {
          OR: [{ username: trimmedUsername }, { email: trimmedEmail }],
        },
      });

      if (userExist) {
        if (userExist.username === trimmedUsername) {
          throw new Error("Username already registered");
        }
        if (userExist.email === trimmedEmail) {
          throw new Error("Email already registered");
        }
      }

      try {
        const hashedPassword = await encrypt(password);
        if (!hashedPassword) {
          throw new InternalServerError("Password hashing failed");
        }

        const user = await prisma.user.create({
          data: {
            email: trimmedEmail,
            username: trimmedUsername,
            password: hashedPassword,

            customization: {
              create: {
                assets: { create: {} },
                general: { create: {} },
                color: { create: {} },
                other: { create: {} },
                badges: { create: [] },
                socialMediaLinks: { create: [] },
              },
            },
          },
        });

        const sessionToken = uuidv4();
        await prisma.session.create({
          data: {
            sessionToken,
            userId: user.id,
            expiresAt: new Date(Date.now() + serverEnv.SEVEN_DAYS * 1000),
          },
        });

        cookies().set({
          name: serverEnv.AUTH_COOKIE,
          value: (await encrypt(sessionToken))!,
          path: "/",
          httpOnly: true,
          maxAge: serverEnv.SEVEN_DAYS,
        });
  
        return { status: 201, message: "User registered successfully", user };
      } catch (error: any) {
        if (error.code === "P2002") {
          throw new Error("Email or username already exists");
        }
        console.error("Registration error:", error);
        throw new InternalServerError("Internal Server Error");
      }
    },
    { body: signUpUser },
  )
  
  .post(
    "/signin",
    async (ctx) => {
      const trimmedUsernameOrEmail = ctx.body.usernameOrEmail.trim();
      const password = ctx.body.password.trim();
  
      const user = await prisma.user.findFirst({
        where: {
          OR: [
            { username: trimmedUsernameOrEmail },
            { email: trimmedUsernameOrEmail },
          ],
        },
      });
  
      if (!user) {
        throw new Error("Invalid username or password");
      }
  
      const decryptedPassword = await decrypt(user.password);
      
      if (decryptedPassword !== password) {
        throw new Error("Invalid username or password");
      }
  
      const sessionToken = uuidv4();
      await prisma.session.create({
        data: {
          sessionToken,
          userId: user.id,
          expiresAt: new Date(Date.now() + serverEnv.SEVEN_DAYS * 1000),
        },
      });
  
      cookies().set({
        name: serverEnv.AUTH_COOKIE,
        value: (await encrypt(sessionToken))!,
        path: "/",
        httpOnly: true,
        maxAge: serverEnv.SEVEN_DAYS,
      });
  
      return { status: 200, message: "Login successful" };
    },
    { body: signInUser },
  )

  .get("/signout", async (ctx) => {
    const sessionToken = await decrypt<Session>(ctx.cookie[serverEnv.AUTH_COOKIE]?.value);
    if (!sessionToken || typeof sessionToken !== 'string') {
        throw new InternalServerError("Invalid session token");
    }

    await prisma.session.delete({
      where: { sessionToken },
    });

    cookies().delete({
      name: serverEnv.AUTH_COOKIE,
      path: "/",
      httpOnly: true,
    });

    return { status: 200, message: "Logout successful" };
  });
