import { useSelector } from "../../../../servicies/hooks/hooks";
import React, { FC, ReactNode, useCallback, useEffect, useState } from "react";
import top from "../../../../images/top.svg";
import down from "../../../../images/down.svg";
import { Currency } from "../../../../servicies/slices/supported-currencies";
import style from "./currency-holder.module.css";
import {
  areMatches,
  getInputValueForSearch,
  useDropdownLogic,
} from "../../currencies-rates/dropdown/dropdown-utils";
type CurrencyHolderPropsType = {
  setCurrencyConversion: (cur: Currency) => void;
  hash: string;
};
export const CurrencyHolder: FC<CurrencyHolderPropsType> = ({
  setCurrencyConversion,
  hash,
}) => {
  const selectedCurrency = useSelector(
    (state) => state.selectedCurrency.selectedCurrency
  );
  const supportedCurrencies = useSelector(
    (state) => state.supportedCurrencies.supportedCurrencies
  );
  const [currency, setCurrency] = useState<Currency | null>(null);
  const { clickCount, setClickCount, inputRef } = useDropdownLogic(
    selectedCurrency,
    supportedCurrencies
  );
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = useCallback((count: number, open: boolean) => {
    setClickCount((prevClickCount) => prevClickCount + count);
    setIsOpen(open);
  }, []);
  useEffect(() => {
    if (setCurrencyConversion) {
      currency
        ? setCurrencyConversion(currency)
        : setCurrencyConversion(selectedCurrency);
    }
  }, [currency, selectedCurrency, setCurrencyConversion]);
  const [inputValue, setInputValue] = useState(selectedCurrency.code);
  const inputValueForSearch = getInputValueForSearch(inputValue);

  const DropdownOption: FC<{ option: Currency }> = React.memo(({ option }) => {
    return (
      <div
        onClick={() => {
          setInputValue(option.code);
          setCurrency(option);
          handleClick(3, false);
        }}
        className={style.option_item}
      >
        {option.code}:{option.name}
      </div>
    );
  });
  let mappedDropdownOptions: Array<ReactNode> = [];
  supportedCurrencies.forEach((option) => {
    if (clickCount <= 2 || areMatches(option, inputValueForSearch)) {
      mappedDropdownOptions.push(
        <DropdownOption option={option} key={`${hash}-${option.code}`} />
      );
    }
  });
  return (
    <div className={style.holder}>
      <div
        className={`${style.selected_wrapper} ${isOpen ? style.triangle : ""}`}
        onClick={() => handleClick(1, !isOpen)}
      >
        <input
          type={"text"}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsOpen(true);
            setClickCount(clickCount + 2);
          }}
          ref={inputRef}
          className={style.selected}
        />
        {isOpen ? <img src={top} alt="top" /> : <img src={down} alt="down" />}
      </div>
      {isOpen && (
        <div className={style.options}>
          {mappedDropdownOptions.length >= 1 ? (
            mappedDropdownOptions
          ) : isOpen ? (
            <div className={style.option_item}>no matches</div>
          ) : null}
        </div>
      )}
    </div>
  );
};
