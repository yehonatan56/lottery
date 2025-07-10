import { remultApi } from "remult/remult-express";
import { Lottary } from "../shared/lottaries";
import { AuthController } from "../shared/AuthController.ts";

export const api = remultApi({
  entities: [Lottary],
  controllers: [AuthController],
});
