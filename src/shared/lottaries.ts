import { Entity, Fields, Validators } from "remult";

@Entity("lottaries", { allowApiCrud: true })
export class Lottary {
  @Fields.autoIncrement()
  id = 0;

  @Fields.string({ validate: [Validators.unique()] })
  name = "";

  @Fields.string({ includeInApi: false })
  password = "";

  @Fields.json()
  participants: string[] = [];

  constructor() {
    this.participants = [];
  }
}
