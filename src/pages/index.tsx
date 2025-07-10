import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1>ברוכים הבאים!</h1>
      <nav className="home-nav">
        <ul>
          <li>
            <Link to="/admin">דף מנהל</Link>
          </li>
          <li>
            <Link to="/user">דף משתמש</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Home;
