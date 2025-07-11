import { useState } from "react";
import { AuthController } from "../shared/AuthController";
import "./User.css";
export default function User() {
  const [lotteryName, setLotteryName] = useState("");
  const [participantName, setParticipantName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    AuthController.loginToLottary(lotteryName, null, participantName).then(
      (res: any) => {
        if (res.success) {
          setIsLoggedIn(true);
          setLotteryName("");
          setParticipantName("");
        } else {
          alert(res.error || "אירעה שגיאה בהתחברות להגרלה");
        }
      },
    );
  };
  return (
    <div className="user-page">
      <h1>דף משתמש</h1>
      {!isLoggedIn ? (
        <form className="login-form" onSubmit={handleLogin}>
          <label htmlFor="lotteryName">שם הגרלה</label>
          <input
            type="text"
            id="lotteryName"
            value={lotteryName}
            onChange={(e) => setLotteryName(e.target.value)}
            placeholder="הזן שם הגרלה"
          />
          <label htmlFor="participantName">שם משתתף</label>
          <input
            type="text"
            id="participantName"
            value={participantName}
            onChange={(e) => setParticipantName(e.target.value)}
            placeholder="הזן את שמך"
          />
          <button
            type="submit"
            disabled={!lotteryName.trim() || !participantName.trim()}
          >
            התחבר להגרלה
          </button>
        </form>
      ) : (
        <div className="welcome-section">
          <h2>ברוך הבא!</h2>
          <p>התחברת בהצלחה להגרלה.</p>
        </div>
      )}
    </div>
  );
}
