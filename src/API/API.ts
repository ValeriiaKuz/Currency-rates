import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Currency } from "../servicies/slices/supported-currencies";
const chosenCurrencies = [
  "EUR",
  "USD",
  "RUB",
  "AMD",
  "CNY",
  "KRW",
  "KZT",
  "RSD",
  "THB",
  "GEL",
];

const axiosRequest = axios.create({
  baseURL: "https://api.currencyapi.com/v3/",
  headers: { apikey: "tYb52XEC1jPBd6GthsxCGWjt0FL296aSUWm2M9OM" },
});

export const fetchSupportedCurrencies = createAsyncThunk<Currency[]>(
  "supportedCurrencies/fetchSupportedCurrencies",
  async () => {
    try {
      const response = await axiosRequest.get("currencies");
      return Object.entries(response.data.data).map(
        ([currencyCode, currencyName]) => ({
          code: currencyCode,
          name: (currencyName as { name: string }).name,
        })
      );
    } catch (error) {
      console.error("Error fetching supported currencies:", error);
      throw error;
    }
  }
);

export const fetchBaseCurrencyRate = createAsyncThunk(
  "baseCurrencyRate/fetchBaseCurrencyRate",
  async (base: string) => {
    const currenciesWithoutBase = chosenCurrencies
      .filter((cur) => {
        return cur !== base;
      })
      .join(",");
    const url = `latest?&base_currency=${base}&currencies=${currenciesWithoutBase}`;
    try {
      const response = await axiosRequest.get(url);
      return Object.entries(response.data.data).map(
        ([currencyCode, currencyName]) => ({
          code: currencyCode,
          value: (currencyName as { value: number }).value,
        })
      );
    } catch (error) {
      console.error("Error fetching base currency:", error);
      throw error;
    }
  }
);

export const fetchBaseCurrencyRateAll = createAsyncThunk(
  "baseCurrencyRateAll/fetchBaseCurrencyRateAll",
  async (base: string) => {
    const url = `latest?&base_currency=${base}`;
    try {
      const response = await axiosRequest.get(url);
      return Object.entries(response.data.data).map(
        ([currencyCode, currencyName]) => ({
          code: currencyCode,
          value: (currencyName as { value: number }).value,
        })
      );
    } catch (error) {
      console.error("Error fetching base currency with all", error);
      throw error;
    }
  }
);
