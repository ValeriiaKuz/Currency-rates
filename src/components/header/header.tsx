import style from "./heade.module.css";
import { Logo } from "./logo/logo";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  const openMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={style.header}>
      {isOpen && <div className={style.back}></div>}
      <Logo />
      <nav>
        <div
          className={`${style.mobile_nav} ${isOpen ? style.clicked : ""}`}
          onClick={openMenu}
        ></div>
        <ul
          className={`${style.header_nav} ${
            isOpen ? style.header_nav_mobile : ""
          }`}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? style.active : style.no_active_nav
            }
          >
            <li className={style.header_nav__item}>Exchange rates </li>
          </NavLink>
          <NavLink
            to="/converter"
            className={({ isActive }) =>
              isActive ? style.active : style.no_active_nav
            }
          >
            <li className={style.header_nav__item}>Converter</li>
          </NavLink>
        </ul>
      </nav>
    </div>
  );
};
