import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
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
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = action.payload;
    },

    doLogoutAction: (state, action) => {
      localStorage.removeItem("accessToken");
      state.isAuthenticated = false;
      state.user = {
        id: "",
        email: "",
        phone: "",
        username: "",
        avatar: "",
        role: "",
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { doLoginAction, doLogoutAction } = accountSlice.actions;

export default accountSlice.reducer;
