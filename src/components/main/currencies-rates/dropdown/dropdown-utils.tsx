import React, { FC, ReactNode, useCallback, useRef, useState } from "react";
import { Currency } from "../../../../servicies/slices/supported-currencies";
import { useDispatch } from "../../../../servicies/hooks/hooks";
import style from "./dropdown.module.css";
import { selectCurrency } from "../../../../servicies/slices/selected-currency";

export const areMatches = (
  option: { code: string; name: string },
  inputValue: string
) => {
  if (
    option.code.toLowerCase().includes(inputValue.toLowerCase()) ||
    option.name.toLowerCase().includes(inputValue.toLowerCase()) ||
    option.code.includes(inputValue.split(":")[0])
  ) {
    return true;
  }
  return false;
};
export const getInputValueForSearch = (inputValue: string) =>
  inputValue.split(" ").length === 1
    ? inputValue.split(" ")[0]
    : inputValue.trim();

export const useDropdownLogic = (
  initialSelectedCurrency: Currency,
  dropdownOptions: Currency[],
  hash?: string
) => {
  const [clickCount, setClickCount] = useState(0);
  const [inputValue, setInputValue] = useState(
    `${initialSelectedCurrency.code} : ${initialSelectedCurrency.name}`
  );
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = useCallback((count: number, open: boolean) => {
    setClickCount((prevClickCount) => prevClickCount + count);
    setIsOpen(open);
  }, []);

  const inputValueForSearch = getInputValueForSearch(inputValue);

  const DropdownOption: FC<{ option: Currency }> = React.memo(({ option }) => {
    const dispatch = useDispatch();
    return (
      <div
        className={style.drop_item}
        onClick={() => (
          dispatch(selectCurrency(option)),
          handleClick(3, false),
          setInputValue(`${option.code}:${option.name}`)
        )}
      >
        <span>{option.code}</span>
        <span>{option.name}</span>
      </div>
    );
  });

  let mappedDropdownOptions: Array<ReactNode> = [];
  dropdownOptions.forEach((option) => {
    if (clickCount <= 2 || areMatches(option, inputValueForSearch)) {
      mappedDropdownOptions.push(
        <DropdownOption option={option} key={option.code} />
      );
    }
  });

  return {
    clickCount,
    setClickCount,
    inputValue,
    setInputValue,
    isOpen,
    setIsOpen,
    inputRef,
    handleClick,
    inputValueForSearch,
    mappedDropdownOptions,
  };
};
