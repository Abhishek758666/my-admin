import { createSlice } from "@reduxjs/toolkit";
import { Login, Logout } from "../thunks/auth.thunk";

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
  reducers: {},
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
    builder
      .addCase(Logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Logout.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.username = "";
        state.userImage = "";
        state.email = "";
        state.token = "";
        state.isLoggedIn = false;
      })
      .addCase(Logout.rejected, (state) => {
        state.loading = false;
        state.error = "Unable to Login, Try again later";
      });
  },
});

export default authSlice.reducer;
