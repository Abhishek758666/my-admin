import { TNoteSchema } from "@/schemas/note.schema";
import { createSlice } from "@reduxjs/toolkit";
import { getNotes } from "../thunks/note.thunk";

interface noteState {
  data: TNoteSchema[] | null;
  loading: boolean;
  error: string | null;
}
const initialState: noteState = {
  data: null,
  loading: false,
  error: null,
};

export const noteSlice = createSlice({
  name: "noteSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getNotes.rejected, (state) => {
        state.loading = false;
        state.error = "Unable to get notes, Try again later";
        state.data = null;
      });
  },
});

export default noteSlice.reducer;
