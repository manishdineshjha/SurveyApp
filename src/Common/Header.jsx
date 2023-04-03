import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header>
        <div className="header main-header">
          <div className="header-left ">
            <Link to="/" className="logo">
              <span> MJ Quizz</span>
            </Link>
          </div>
          <div className="header-right">
            Welcome
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
