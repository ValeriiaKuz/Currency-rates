import React, { useEffect } from "react";
import "./App.module.css";
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import style from "./App.module.css";
import { Route, Routes } from "react-router-dom";
import { CurrenciesRates } from "./components/main/currencies-rates/currencies-rates";
import { Converter } from "./components/main/converter/converter";
import { NotFound } from "./components/main/not-found/not-found";
import { useDispatch } from "./servicies/hooks/hooks";
import { fetchSupportedCurrencies } from "./API/API";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSupportedCurrencies());
  }, [dispatch]);

  return (
    <div className={style.app_wrapper}>
      <Header />
      <Routes>
        <Route path="/" element={<CurrenciesRates />} />
        <Route path="/converter" element={<Converter />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
