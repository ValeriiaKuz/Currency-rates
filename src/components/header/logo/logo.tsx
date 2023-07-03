import style from "./logo.module.css";
import logo from "../../../images/coin-money-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";

export const Logo = () => {
  const navigate = useNavigate();
  const onLogoClick = () => {
    navigate("/");
  };
  return (
    <>
      <img
        src={logo}
        alt={"my logo"}
        className={style.logo}
        onClick={onLogoClick}
      />
    </>
  );
};
