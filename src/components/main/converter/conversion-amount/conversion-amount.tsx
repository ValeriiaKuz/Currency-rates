import { Currency } from "../../../../servicies/slices/supported-currencies";
import { FC, useMemo } from "react";
import style from "./converter-amount.module.css";
type ConversionAmountPropsType = {
  currencyForConversion: Currency;
  currencyInConversion: Currency;
  inputValue: string;
  rateForConversion: { code: string; value: number };
};
export const ConversionAmount: FC<ConversionAmountPropsType> = ({
  currencyForConversion,
  currencyInConversion,
  inputValue,
  rateForConversion,
}) => {
  const totalAmount = useMemo(
    () => (rateForConversion.value * +inputValue).toFixed(3),
    [rateForConversion.value,inputValue]
  );

  return (
    <div className={style.converter_amount_wrapper}>
      <div className={style.amount}>
        <span>{inputValue}</span>
        <span>{currencyForConversion.code}</span>
        {` =`}
      </div>
      <div className={style.total_amount}>
        <span>{totalAmount}</span>
        <span>{currencyInConversion.code}</span>
      </div>
    </div>
  );
};
