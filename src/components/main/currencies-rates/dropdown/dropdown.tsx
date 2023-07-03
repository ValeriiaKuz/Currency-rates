import { FC, useState } from "react";
import style from "./dropdown.module.css";
import { Currency } from "../../../../servicies/slices/supported-currencies";
import { useDispatch } from "../../../../servicies/hooks/hooks";
import { selectCurrency } from "../../../../servicies/slices/selected-currency";
import Bitcoin from "../../../../images/Bitcoin.svg";
type DropdownType = {
  dropdownOptions: Array<Currency>;
  selected: Currency;
};
const Dropdown: FC<DropdownType> = ({ dropdownOptions, selected }) => {
  const [isClose, setIsOpen] = useState(true);
  const handleClick = () => {
    setIsOpen(!isClose);
  };
  const dispatch = useDispatch();
  const mappedDropdownOptions = dropdownOptions.map((option) => {
    if (option.code === selected.code) {
      return null;
    }
    return (
      <div
        key={option.code}
        className={style.drop_item}
        onClick={() => (dispatch(selectCurrency(option)), handleClick())}
      >
        <span>{option.code}</span>
        <span>{option.name}</span>
      </div>
    );
  });

  return (
    <section className={style.dropdown}>
      <h2 className={style.dropdown_title}>Choose a currency</h2>
      <div className={style.dropdown_fields}>
        <img src={Bitcoin} className={style.bitcoin} alt={'bitcoin'}/>
        <div className={style.dropdown_selected} onClick={handleClick}>
          {selected.code}:{selected.name}
        </div>
        <div className={`${style.dropdown_menu} ${isClose ? style.close : ""}`}>
          {mappedDropdownOptions}
        </div>
      </div>
    </section>
  );
};

export default Dropdown;
