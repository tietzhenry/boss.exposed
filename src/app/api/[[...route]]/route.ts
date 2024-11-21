import { authRoute } from "@/server/auth";
import { assetsUploaderRoute } from "@/server/dashboard/customize/AssetsUploader";
import { userRoute } from "@/server/user";
import { userdisplayroute } from "@/server/userdisplay";
import { Elysia } from "elysia";

/**
 * Force dynamic import for RPC clients
 */
export const dynamic = "force-dynamic";

/**
 * Main API router
 * Combines auth and user routes under the '/api' prefix
 */
const app = new Elysia({ prefix: "/api", aot: false })
  .use(authRoute).use(userRoute).use(userdisplayroute)
  .use(assetsUploaderRoute)

/**
 * Export the app type for use with RPC clients (e.g., edenTreaty)
 */
export type App = typeof app;

/**
 * Export handlers for different HTTP methods
 * These are used by Next.js API routes [[...route]].ts
 */
export const GET = app.handle;
export const POST = app.handle;
export const PUT = app.handle;
export const DELETE = app.handle;
export const PATCH = app.handle;
