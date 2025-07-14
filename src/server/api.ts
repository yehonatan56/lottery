import { remultApi } from "remult/remult-express";
import { Lottary } from "../shared/lottaries";
import { AuthController } from "../shared/AuthController.ts";
import { createPostgresDataProvider } from "remult/postgres";

export const api = remultApi({
  dataProvider: createPostgresDataProvider({
    connectionString: process.env.DATABASE_URL || undefined,
  }),
  entities: [Lottary],
  controllers: [AuthController],
});
