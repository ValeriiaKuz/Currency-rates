import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCurrency: { code: "USD", name: "United States Dollar" },
};

const selectedCurrencySlice = createSlice({
  name: "selectCurrency",
  initialState,
  reducers: {
    selectCurrency(state, action) {
      state.selectedCurrency.code = action.payload.code;
      state.selectedCurrency.name = action.payload.name;
    },
  },
});

export const { selectCurrency } = selectedCurrencySlice.actions;

export default selectedCurrencySlice.reducer;
