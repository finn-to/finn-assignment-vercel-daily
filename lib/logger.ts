import pino from "pino";

const isServer = typeof window === "undefined";

const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  base: {
    env: process.env.NODE_ENV,
    ...(process.env.VERCEL_ENV && { vercelEnv: process.env.VERCEL_ENV }),
    ...(process.env.VERCEL_GIT_COMMIT_SHA && {
      commitSha: process.env.VERCEL_GIT_COMMIT_SHA.slice(0, 7),
    }),
  },
  // Vercel captures stdout as JSON — keep it machine-readable on the server.
  // In the browser pino falls back to console methods automatically.
  ...(isServer
    ? {}
    : {
        browser: {
          asObject: true,
        },
      }),
});

export default logger;
