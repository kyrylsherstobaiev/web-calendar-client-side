import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = { date: `${moment().clone().format("DD/MM/YYYY")}` };

const pickedDate = createSlice({
  name: "pickedDate",
  initialState,
  reducers: {
    setPickedDate: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const { setPickedDate } = pickedDate.actions;
export default pickedDate.reducer;
