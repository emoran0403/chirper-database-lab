import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState, Votes } from "../../../types";

// Define a type for the slice state - Rather import it from the types file instead

// Define the initial state using that type
// this is the initial state object
const initialState: Votes = {
  value: 0,
};

// the reducers in this slice are used to increment or decrement the votes counter
export const interactionsSlice = createSlice({
  name: "interactions",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },

    decrementByAmount: (state, action: PayloadAction<number>) => {
      state.value -= action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount, decrementByAmount } = interactionsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value;

export default interactionsSlice.reducer;
