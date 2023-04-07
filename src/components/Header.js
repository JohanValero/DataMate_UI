import React from "react";
import Auth from "./Auth";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="App-header">
      <Link to="/">
        <h1 className="text-white">Data Mate</h1>
      </Link>
      <Auth />
    </header>
  );
}

export default Header;
