import { remultApi } from "remult/remult-express";
import { createPostgresDataProvider } from "remult/postgres";
import { Lottary } from "../shared/lottaries.js";
import { AuthController } from "../shared/AuthController.js";

export const api = remultApi({
  dataProvider: process.env.DATABASE_URL
    ? createPostgresDataProvider({
        connectionString: process.env.DATABASE_URL,
      })
    : undefined,
  entities: [Lottary],
  controllers: [AuthController],
});
