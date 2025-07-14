import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLottaryStore } from "../../store.ts";
import { AuthController } from "../../shared/AuthController.ts";

export default function LoginLottery() {
  const [lotteryName, setLotteryName] = useState("");
  const [lotteryPassword, setLotteryPassword] = useState("");
  // @ts-ignore
  const setLotteryNameGlobal = useLottaryStore((state) => state.setLottaryName);
  const navigate = useNavigate();
  const handleLoginLottery = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await AuthController.loginToLottaryAsAdmin(
      lotteryName,
      lotteryPassword,
    );
    if (res.success) {
      setLotteryName("");
      setLotteryPassword("");
      // @ts-ignore
      setLotteryNameGlobal(res.room?.name);
      navigate("/lottery");
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
