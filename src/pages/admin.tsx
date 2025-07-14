import React from "react";
import CreateLottery from "../components/createLottery/createLottery";
import LoginLottery from "../components/loginLottery/loginLottery";
import "./Admin.css";
export default function Admin() {
  return (
    <div className="admin-page">
      <CreateLottery />
      <LoginLottery />
    </div>
  );
}
