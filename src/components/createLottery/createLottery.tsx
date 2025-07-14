import { useState } from "react";
import { AuthController } from "../../shared/AuthController";
import React from "react";

export default function CreateLottery() {
  const [lotteryName, setLotteryName] = useState("");
  const [lotteryPassword, setLotteryPassword] = useState("");
  const handleCreateLottery = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await AuthController.createLottary(lotteryName, lotteryPassword);
      setLotteryName("");
    } catch (error: any) {
      alert(error.message);
    }
  };
  return (
    <div>
      <h1>צור הגרלה</h1>
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
          onClick={handleCreateLottery}
          disabled={!lotteryName.trim()}
        >
          צור הגרלה
        </button>
      </form>
    </div>
  );
}
