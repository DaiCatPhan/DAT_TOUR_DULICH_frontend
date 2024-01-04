import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthticated: false,
  user: {
    id: "",
    email: "",
    phone: "",
    username: "",
    avatar: "",
    role: "",
  },
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    doLoginAction: (state, action) => {
      state.isAuthticated = true;
      state.user = action.payload; 
    },
  },
});

// Action creators are generated for each case reducer function
export const { doLoginAction } = accountSlice.actions;

export default accountSlice.reducer;
