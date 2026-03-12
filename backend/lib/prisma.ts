import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../generated/prisma/client";
import pRetry from "p-retry";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaNeon({
  connectionString,
  connectionTimeoutMillis: 10_000,
});
// const adapter = new PrismaPg({
//   connectionString,
//   connectionTimeoutMillis: 2_000,
// });
const prisma = new PrismaClient({ adapter }).$extends({
  query: {
    async $allOperations({ operation, model, args, query }) {
      return pRetry(async () => await query(args), {
        onFailedAttempt: ({
          error,
          attemptNumber,
          retriesLeft,
          retriesConsumed,
        }) => {
          console.warn(
            `Retrying ${model ?? "raw"}.${operation}. Attempt ${attemptNumber} failed. ` +
              `${retriesLeft} retries left. ${retriesConsumed} retries consumed.`,
          );
        },
      });
    },
  },
});

export { prisma };
