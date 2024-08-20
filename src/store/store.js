import { configureStore } from "@reduxjs/toolkit";

import isSignedInUser from "../reducers/isSignedInUser.js";
import pickedDate from "../reducers/pickedDate.js";
import isToday from "../reducers/isToday.js";

export default configureStore({
  reducer: {
    isSignedInUser,
    pickedDate,
    isToday,
  },
});
