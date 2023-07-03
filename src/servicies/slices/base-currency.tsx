import { createSlice } from "@reduxjs/toolkit";
import { fetchBaseCurrencyRate } from "../../API/API";
export type BaseCurrency = {
  value: number;
  code: string;
};
interface baseCurrencyRate {
  baseCurrencyRate: null | Array<BaseCurrency>;
  isLoading: boolean;
  isError: boolean;
}
const initialState: baseCurrencyRate = {
  baseCurrencyRate: null,
  isLoading: false,
  isError: false,
};
export const baseCurrencyRateSlice = createSlice({
  name: "baseCurrencyRate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBaseCurrencyRate.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchBaseCurrencyRate.fulfilled, (state, action) => {
        state.baseCurrencyRate = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchBaseCurrencyRate.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default baseCurrencyRateSlice.reducer;
