import { createSlice } from "@reduxjs/toolkit";
import { Login } from "../thunks/auth.thunk";

interface authState {
  username: string;
  userImage: string;
  email: string;
  token: string;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}
const initialState: authState = {
  username: "",
  userImage: "",
  email: "",
  isLoggedIn: false,
  token: "",
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logOut: (state) => {
      state.username = "";
      state.userImage = "";
      state.email = "";
      state.token = "";
      state.loading = false;
      state.isLoggedIn = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.username = action.payload?.username;
        state.userImage = action.payload?.userImage;
        state.email = action.payload?.email;
        state.token = action.payload?.token;
        state.isLoggedIn = true;
      })
      .addCase(Login.rejected, (state) => {
        state.loading = false;
        state.error = "Unable to Login, Try again later";
      });
  },
});

export const { logOut } = authSlice.actions;
export default authSlice.reducer;
