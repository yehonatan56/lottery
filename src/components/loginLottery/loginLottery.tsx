import { useState } from "react";
import { AuthController } from "../../shared/AuthController.ts";

export default function LoginLottery() {
  const [lotteryName, setLotteryName] = useState("");
  const [lotteryPassword, setLotteryPassword] = useState("");
  const handleLoginLottery = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await AuthController.loginToLottaryAsAdmin(
      lotteryName,
      lotteryPassword,
    );
    if (res.success) {
      setLotteryName("");
      setLotteryPassword("");
      // Redirect or update state to indicate successful login
    } else {
      alert(res.error || "אירעה שגיאה בהתחברות להגרלה");
    }
  };
  return (
    <div className="login-lottery">
      <h1>התחברות להגרלה</h1>
      <form className="create-lottery">
        <label htmlFor="lotteryName">שם הגרלה</label>
        <input
          type="text"
          id="lotteryName"
          value={lotteryName}
          onChange={(e) => setLotteryName(e.target.value)}
          placeholder="הזן שם הגרלה"
        />
        <label htmlFor="lotteryPassword">סיסמת הגרלה (אופציונלי)</label>
        <input
          type="password"
          id="lotteryPassword"
          value={lotteryPassword}
          onChange={(e) => setLotteryPassword(e.target.value)}
          placeholder="הזן סיסמת הגרלה (אופציונלי)"
        />
        <button
          type="submit"
          onClick={handleLoginLottery}
          disabled={!lotteryName.trim()}
        >
          התחבר להגרלה
        </button>
      </form>
    </div>
  );
}
