import style from "./error.module.css";
export const Error = () => {
  return (
    <div className={style.error}>
      <span>
        Ops! Something went wrong.
        <br />
        Please, try again!
      </span>
    </div>
  );
};
