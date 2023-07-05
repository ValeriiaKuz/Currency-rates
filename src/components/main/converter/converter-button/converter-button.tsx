import React, { FC, useState } from "react";
import style from "./converter-button.module.css";
import money from "../../../../images/6.svg";
import right from "../../../../images/right.svg";
export const ConverterButton: FC<{
  notDisabled: boolean;
  setWasClicked: (wasClicked: boolean) => void;
}> = ({ notDisabled, setWasClicked }) => {
  const [showImage, setShowImage] = useState(false);
  const [slideOut, setSlideOut] = useState(false);
  const [slideBack, setSlideBack] = useState(false);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!notDisabled) {
      setWasClicked(true);
    } else {
      setSlideOut(true);
      setSlideBack(false);
      setTimeout(() => {
        setShowImage(true);
      }, 300);
      setTimeout(() => {
        setSlideBack(true);
        setSlideOut(false);
        setTimeout(() => {
          setShowImage(false);
        }, 600);
      }, 3000);
    }
  };

  return (
    <>
      <button
        type="submit"
        onClick={(e) => {
          handleButtonClick(e);
        }}
        className={style.button}
      >
        <span>Invert</span>
        <img src={right} alt={"right"} />
      </button>
      {showImage && (
        <div
          className={`${style.imageContainer} ${
            slideOut ? style.slideOut : ""
          } ${slideBack ? style.slideBack : ""}`}
        >
          <img src={money} alt="Картинка" className={style.slide} />
        </div>
      )}
    </>
  );
};
