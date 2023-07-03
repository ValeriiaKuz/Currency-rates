import style from "../content.module.css";
import Dropdown from "./dropdown/dropdown";
import { CurrencyRate } from "./currency-rate/currency-rate";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "../../../servicies/hooks/hooks";
import { fetchBaseCurrencyRate } from "../../../API/API";
import { Preloader } from "../preloader/preloader";
import { Error } from "../error/error";

export const CurrenciesRates: FC = () => {
  const selectedCurrency = useSelector(
    (state) => state.selectedCurrency.selectedCurrency
  );

  const { isLoading, isError, supportedCurrencies } = useSelector(
    (state) => state.supportedCurrencies
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const base = selectedCurrency.code;
    dispatch(fetchBaseCurrencyRate(base));
  }, [selectedCurrency, dispatch]);

  return supportedCurrencies.length > 0 ? (
    <div className={style.content}>
      <div className={style.content_wrapper}>
        <div className={style.content_sections}>
          <Dropdown
            dropdownOptions={supportedCurrencies}
            selected={selectedCurrency}
          />
          <CurrencyRate selected={selectedCurrency} />
        </div>
      </div>
    </div>
  ) : isLoading ? (
    <Preloader />
  ) : (
    <Error />
  );
};
