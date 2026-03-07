import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import pRetry from "p-retry";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({
  connectionString,
  connectionTimeoutMillis: 2_000,
});
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

// try {
//   return await query(args);
// } catch (error: any) {
//   if (error.code === "P1001" || error.code === "P2010") {
//     console.warn(
//       `Retrying ${model ?? "raw"}.${operation} due to connection error...`,
//     );
//     await prisma.$disconnect();
//     await prisma.$connect();
//     throw error;
//   }
//   throw error;
// }
