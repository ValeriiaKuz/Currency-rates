import { CurrencyHolder } from "./currency-holder/currency-holder";
import style from "./converter.module.css";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Currency } from "../../../servicies/slices/supported-currencies";
import right from "../../../images/right.svg";
import { useDispatch, useSelector } from "../../../servicies/hooks/hooks";
import { fetchBaseCurrencyRateAll } from "../../../API/API";
import { resetAfterClose } from "../../../servicies/slices/base-currency-all";
import { ConversionAmount } from "./conversion-amount/conversion-amount";
import { ConverterButton } from "./converter-button/converter-button";
import { Preloader } from "../preloader/preloader";
import { Error } from "../error/error";
export const Converter = () => {
  const [currencyForConversion, setCurrencyForConversion] =
    useState<Currency | null>(null);
  const [currencyInConversion, setCurrencyInConversion] =
    useState<Currency | null>(null);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  const dispatch = useDispatch();
  const onHandleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currencyForConversion) {
      const base = currencyForConversion.code;
      dispatch(fetchBaseCurrencyRateAll(base));
    }
  };
  const { isLoading, isError, baseCurrencyRate } = useSelector(
    (state) => state.baseCurrencyRateAll
  );
  const rateForConversion = baseCurrencyRate?.find((rate) => {
    return rate.code === currencyInConversion?.code;
  });
  useEffect(() => {
    return () => {
      dispatch(resetAfterClose());
    };
  }, [dispatch]);

  return isError ? (
    <Error />
  ) : (
    <div className={style.wrapper}>
      <div className={style.converter}>
        <form className={style.converter_form} onSubmit={onHandleSubmit}>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type={"number"}
            min={0}
            placeholder={"Amount"}
            className={style.converter_amount}
            ref={inputRef}
          />
          <div className={style.holders}>
            <CurrencyHolder setCurrencyConversion={setCurrencyForConversion} />
            <img src={right} alt={"in"} />
            <CurrencyHolder setCurrencyConversion={setCurrencyInConversion} />
          </div>
          <ConverterButton />
        </form>
        {isLoading ? (
          <Preloader />
        ) : (
          currencyForConversion &&
          currencyInConversion &&
          inputValue &&
          rateForConversion && (
            <ConversionAmount
              currencyForConversion={currencyForConversion}
              currencyInConversion={currencyInConversion}
              inputValue={inputValue}
              rateForConversion={rateForConversion}
            />
          )
        )}
      </div>
    </div>
  );
};
