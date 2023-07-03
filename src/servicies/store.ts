import { combineReducers, configureStore } from "@reduxjs/toolkit";
import supportedCurrenciesReducer from "./slices/supported-currencies";
import baseCurrencyRateReducer from "./slices/base-currency";
import selectedCurrencyReducer from "./slices/selected-currency";
import baseCurrencyRateAllReducer from "./slices/base-currency-all";

const rootReducer = combineReducers({
  supportedCurrencies: supportedCurrenciesReducer,
  baseCurrencyRate: baseCurrencyRateReducer,
  baseCurrencyRateAll: baseCurrencyRateAllReducer,
  selectedCurrency: selectedCurrencyReducer,
});
export const store = configureStore({
  reducer: rootReducer,
});
