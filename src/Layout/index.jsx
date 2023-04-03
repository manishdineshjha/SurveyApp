import React from "react";
import Header from "../Common/Header";

const Layout = (props) => {
  return (
    <div className="main-app">
      <Header />
      <div className="main-container">{props.children}</div>
    </div>
  );
};

export default Layout;
