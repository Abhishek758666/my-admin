import { TVisitorSchema } from "@/schemas/visitor.schema";
import { createSlice } from "@reduxjs/toolkit";
import { getVisitors } from "../thunks/visitor.thunk";

interface visitorState {
  data: TVisitorSchema[] | null;
  loading: boolean;
  error: string | null;
}
const initialState: visitorState = {
  data: null,
  loading: false,
  error: null,
};

export const visitorSlice = createSlice({
  name: "visitorSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVisitors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVisitors.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getVisitors.rejected, (state) => {
        state.loading = false;
        state.error = "Unable to get visitors, Try again later";
      });
  },
});

export default visitorSlice.reducer;
