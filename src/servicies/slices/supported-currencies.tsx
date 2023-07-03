import { createSlice } from "@reduxjs/toolkit";
import { fetchSupportedCurrencies } from "../../API/API";
export type Currency = {
  name: string;
  code: string;
};
interface supportedCurrencies {
  supportedCurrencies: Array<Currency>;
  isLoading: boolean;
  isError: boolean;
}
const initialState: supportedCurrencies = {
  supportedCurrencies: [],
  isLoading: false,
  isError: false,
};
export const supportedCurrenciesSlice = createSlice({
  name: "supportedCurrencies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSupportedCurrencies.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchSupportedCurrencies.fulfilled, (state, action) => {
        state.supportedCurrencies = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchSupportedCurrencies.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default supportedCurrenciesSlice.reducer;
