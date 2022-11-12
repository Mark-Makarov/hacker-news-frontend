import React from "react";
import { Link } from "react-router-dom";
import Logo from "../img/avito.tech.png"

const Header = () => {
  return (
    <header>
      <h1>Тестовое задание для Avito.tech
        <img  src={Logo} className="logo"/>
      </h1>
      <nav className="nav-center">
        <Link to="/" className="nav-link">
          Главная
        </Link>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link"
          href="https://github.com/Mark-Makarov"
        >
          GitHub
        </a>
      </nav>
    </header>
  );
};

export default Header;
