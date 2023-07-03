import style from "./currency-rate.module.css";
import { FC } from "react";
import { useSelector } from "../../../../servicies/hooks/hooks";
import { Currency } from "../../../../servicies/slices/supported-currencies";
type CurrencyRateProps = {
  selected: Currency;
};
export const CurrencyRate: FC<CurrencyRateProps> = ({ selected }) => {
  const rates = useSelector((state) => state.baseCurrencyRate.baseCurrencyRate);
  const mappedRates = rates?.map((rate) => {
    return (
      <div className={style.rate_item} key={rate.code}>
        {rate.code}:{rate.value}
      </div>
    );
  });

  return (
    <section className={style.rates}>
      <div className={style.selected_currency}>{selected.code}</div>
      <div>{mappedRates}</div>
    </section>
  );
};
