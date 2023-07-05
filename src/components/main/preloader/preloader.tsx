import style from "./preloader.module.css";
export const Preloader = () => {
  return (
    <div className={style.loader_wrapper}>
      <div className={style.loader}></div>
    </div>
  );
};
