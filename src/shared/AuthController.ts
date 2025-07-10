import { BackendMethod, repo } from "remult";
import { Lottary } from "./lottaries.ts";
export class AuthController {
  @BackendMethod({ allowed: true })
  static async hashPassword(password: string): Promise<string> {
    const bcrypt = await import("bcrypt");
    return await bcrypt.hash(password, 10);
  }

  @BackendMethod({ allowed: true })
  static async verifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const bcrypt = await import("bcrypt");
    return await bcrypt.compare(password, hashedPassword);
  }

  @BackendMethod({ allowed: true })
  static async createLottary(
    name: string,
    password?: string,
  ): Promise<Lottary> {
    const newLottary = new Lottary();
    newLottary.name = name.trim();
    if (password?.trim()) {
      newLottary.password = await AuthController.hashPassword(password);
    }
    debugger;

    return await repo(Lottary).insert(newLottary);
  }

  @BackendMethod({ allowed: true })
  static async loginToLottary(
    name: string,
    password?: string,
    isAdmin: boolean = false,
  ): Promise<{ success: boolean; room?: Lottary; error?: string }> {
    try {
      const foundLottary = await repo(Lottary).findOne({
        where: { name },
      });

      if (!foundLottary) {
        return { success: false, error: "לא נמצא חדר עם המספר הזה" };
      }

      // בדיקת סיסמה רק אם זה מנהל ויש סיסמה לחדר
      if (isAdmin && foundLottary.password && foundLottary.password.trim()) {
        if (!password) {
          return { success: false, error: "נדרשת סיסמת מנהל לחדר זה" };
        }

        const isPasswordValid = await AuthController.verifyPassword(
          password,
          foundLottary.password,
        );

        if (!isPasswordValid) {
          return { success: false, error: "סיסמה שגויה" };
        }
      }

      return { success: true, room: foundLottary };
    } catch (error) {
      console.error("שגיאה בהתחברות לחדר:", error);
      return { success: false, error: "אירעה שגיאה בחיפוש החדר" };
    }
  }
}
