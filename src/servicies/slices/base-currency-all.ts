import { createSlice } from "@reduxjs/toolkit";
import { fetchBaseCurrencyRateAll } from "../../API/API";

export type BaseCurrencyAll = {
  value: number;
  code: string;
};
interface baseCurrencyRateAll {
  baseCurrencyRate: null | Array<BaseCurrencyAll>;
  isLoading: boolean;
  isError: boolean;
  closed: boolean;
}
const initialState: baseCurrencyRateAll = {
  baseCurrencyRate: null,
  isLoading: false,
  isError: false,
  closed: false,
};
export const baseCurrencyRateAllSlice = createSlice({
  name: "baseCurrencyRateAll",
  initialState,
  reducers: {
    resetAfterClose(state) {
      state.closed = true;
      state.baseCurrencyRate = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBaseCurrencyRateAll.pending, (state) => {
        state.closed = false;
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchBaseCurrencyRateAll.fulfilled, (state, action) => {
        state.baseCurrencyRate = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchBaseCurrencyRateAll.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});
export const { resetAfterClose } = baseCurrencyRateAllSlice.actions;
export default baseCurrencyRateAllSlice.reducer;
