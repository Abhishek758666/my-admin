import { createSlice } from "@reduxjs/toolkit";

interface ChatState {
  loading: boolean;
}

const initialState: ChatState = {
  loading: false,
};

export const loadingSlice = createSlice({
  name: "loadingSlice",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
