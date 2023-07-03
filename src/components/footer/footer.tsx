import style from "./footer.module.css";
export const Footer = () => {
  return (
    <div className={style.footer}>
      <span>
        This <a href={"https://currencyapi.com"}>API</a> was used in development
      </span>
      <span>Valeriia Kuznetsova</span>
    </div>
  );
};
