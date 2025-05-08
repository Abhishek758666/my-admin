import { TNoteSchema } from "@/schemas/note.schema";
import { createSlice } from "@reduxjs/toolkit";
import { deleteNote, getNotes, toggleNote } from "../thunks/note.thunk";
import { successToast } from "@/lib/toastify";

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

    builder
      .addCase(toggleNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleNote.fulfilled, (state, action) => {
        state.loading = false;
        if (state.data) {
          const index = state.data.findIndex(
            (note) => note.id === action.payload
          );
          if (index !== -1) {
            const updatedData = {
              ...state.data[index],
              verified: !state.data[index].verified,
            };
            console.log(updatedData);
            state.data[index] = updatedData;
          }
          successToast("Note Verified successfully");
        }
        state.error = null;
      })
      .addCase(toggleNote.rejected, (state) => {
        state.loading = false;
        state.error = "Unable to update notes, Try again later";
      });

    builder
      .addCase(deleteNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.loading = false;
        if (state.data) {
          state.data = state.data.filter((note) => note.id != action.payload);
          successToast("Note Verified successfully");
        }
        state.error = null;
      })
      .addCase(deleteNote.rejected, (state) => {
        state.loading = false;
        state.error = "Unable to update notes, Try again later";
      });
  },
});

export default noteSlice.reducer;
