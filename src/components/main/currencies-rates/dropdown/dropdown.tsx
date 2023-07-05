import React, { ChangeEvent, FC } from "react";
import style from "./dropdown.module.css";
import { Currency } from "../../../../servicies/slices/supported-currencies";
import Bitcoin from "../../../../images/Bitcoin.svg";
import { useDropdownLogic } from "./dropdown-utils";
type DropdownType = {
  dropdownOptions: Array<Currency>;
  selected: Currency;
};
const Dropdown: FC<DropdownType> = ({ dropdownOptions, selected }) => {
  const {
    clickCount,
    setClickCount,
    inputValue,
    setInputValue,
    isOpen,
    setIsOpen,
    inputRef,
    handleClick,
    mappedDropdownOptions,
  } = useDropdownLogic(selected, dropdownOptions);

  return (
    <section className={style.dropdown}>
      <h2 className={style.dropdown_title}>Choose a currency</h2>
      <div className={style.dropdown_fields}>
        <img src={Bitcoin} className={style.bitcoin} alt={"bitcoin"} />
        <input
          type={"text"}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value);
            setClickCount(clickCount + 1);
            setIsOpen(true);
          }}
          value={clickCount === 1 ? "" : inputValue}
          className={style.dropdown_selected}
          onClick={() => handleClick(1, true)}
          onDoubleClick={() => setInputValue("")}
          ref={inputRef}
        />

        <div className={`${style.dropdown_menu} `}>
          {isOpen && mappedDropdownOptions.length >= 1 ? (
            mappedDropdownOptions
          ) : isOpen ? (
            <div className={style.drop_item}>no matches</div>
          ) : null}
        </div>
      </div>
    </section>
  );
};
export default Dropdown;
