import { Session } from "@prisma/client";
import { decrypt } from "../crypto";
import { InternalServerError } from "elysia";
import prisma from "../prisma";

export class UserService {
    
    static async retrieveUser(sessionToken: string) {
        const session = await this.retrieveSession(sessionToken);

        const user = await prisma.user.findFirst({
            where: {
                id: session.userId,
            },
        });
    
        if (!user) throw new InternalServerError("User not found");
    
        return user;
    }
    
    static async retrieveSession(sessionToken: string) {
        const decryptedToken = await decrypt<Session>(sessionToken);

        if (!decryptedToken || typeof decryptedToken !== "string") {
            throw new InternalServerError("Invalid session token");
        }

        const session = await prisma.session.findFirst({
            where: { sessionToken: decryptedToken },
        });

        if (!session) throw new InternalServerError("Session not found");

        return session;
    }
}
