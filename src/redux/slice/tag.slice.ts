import { TTagResponseSchema } from "@/schemas/tag.schema";
import { createSlice } from "@reduxjs/toolkit";
import { addTag, deleteTag, editTag, getTags } from "../thunks/tag.thunk";
import { successToast } from "@/lib/toastify";

interface tagState {
  data: TTagResponseSchema[] | null;
  loading: boolean;
  error: string | null;
}
const initialState: tagState = {
  data: null,
  loading: false,
  error: null,
};

export const tagSlice = createSlice({
  name: "tagSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTags.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTags.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getTags.rejected, (state) => {
        state.loading = false;
        state.error = "Unable to get tags, Try again later";
      });

    builder
      .addCase(addTag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTag.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data
          ? [...state.data, action.payload]
          : [action.payload];
        successToast("Tag added successfully");
        state.error = null;
      })
      .addCase(addTag.rejected, (state) => {
        state.loading = false;
        state.error = "Unable to get tags, Try again later";
      });

    builder
      .addCase(editTag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editTag.fulfilled, (state, action) => {
        state.loading = false;
        if (state.data) {
          const index = state.data.findIndex(
            (tag) => tag.id === action.payload.id
          );
          if (index !== -1) {
            state.data[index] = action.payload;
          }
        }
        successToast("Tag edited successfully");
        state.error = null;
      })
      .addCase(editTag.rejected, (state) => {
        state.loading = false;
        state.error = "Unable to get tags, Try again later";
      });

    builder
      .addCase(deleteTag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTag.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data
          ? state.data.filter((tag) => tag.id != action.payload)
          : null;
        successToast("Tag deleted successfully");
        state.error = null;
      })
      .addCase(deleteTag.rejected, (state) => {
        state.loading = false;
        state.error = "Unable to delete tag, Try again later";
      });
  },
});

export default tagSlice.reducer;
