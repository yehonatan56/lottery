import CreateLottery from "../components/createLottery/createLottery.tsx";
import LoginLottery from "../components/loginLottery/loginLottery.tsx";
import "./Admin.css";
export default function Admin() {
  return (
    <div className="admin-page">
      <CreateLottery />
      <LoginLottery />
    </div>
  );
}
