import { useSelector } from "../../../../servicies/hooks/hooks";
import React, { FC, useEffect, useState } from "react";
import top from "../../../../images/top.svg";
import down from "../../../../images/down.svg";
import { Currency } from "../../../../servicies/slices/supported-currencies";
import style from "./currency-holder.module.css";
type CurrencyHolderPropsType = {
  setCurrencyConversion?: (cur: Currency) => void;
};
export const CurrencyHolder: FC<CurrencyHolderPropsType> = ({
  setCurrencyConversion,
}) => {
  const [currency, setCurrency] = useState<Currency | null>(null);
  const selectedCurrency = useSelector(
    (state) => state.selectedCurrency.selectedCurrency
  );
  const currenciesWithoutSelected = useSelector(
    (state) => state.supportedCurrencies.supportedCurrencies
  ).filter((cur) => {
    return cur.code !== selectedCurrency.code;
  });

  const [isOpen, setIsOpen] = useState(false);
  const toggleDrop = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (setCurrencyConversion) {
      currency
        ? setCurrencyConversion(currency)
        : setCurrencyConversion(selectedCurrency);
    }
  }, [currency, selectedCurrency,setCurrencyConversion]);

  return (
    <div className={style.holder}>
      <div
        onClick={toggleDrop}
        className={`${style.selected} ${isOpen ? style.triangle : ""}`}
      >
        <span>{currency ? currency.code : selectedCurrency.code}</span>
        {isOpen ? <img src={top} alt="top" /> : <img src={down} alt="down" />}
      </div>
      <div className={style.options}>
        {isOpen &&
          currenciesWithoutSelected.map((cur) => {
            return (
              <div
                key={cur.code}
                onClick={() => {
                  setCurrency(cur);
                  toggleDrop();
                }}
                className={style.option_item}
              >
                {cur.code}:{cur.name}
              </div>
            );
          })}
      </div>
    </div>
  );
};
