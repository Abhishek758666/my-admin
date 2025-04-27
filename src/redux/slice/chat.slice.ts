import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { chat } from "../thunks/chat.thunk";

export interface Message {
  role: "user" | "model";
  parts: [
    {
      text: string;
    }
  ];
}

interface ChatState {
  data: Message[];
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  data: [],
  loading: false,
  error: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addUserMessage: (state, action: PayloadAction<string>) => {
      state?.data?.push({ parts: [{ text: action.payload }], role: "user" });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(chat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(chat.fulfilled, (state, action) => {
        state.loading = false;
        state?.data?.push({ parts: [{ text: action.payload }], role: "model" });
      })
      .addCase(chat.rejected, (state) => {
        state.loading = false;
        state?.data?.push({
          parts: [{ text: "some thing went wrong" }],
          role: "model",
        });
        state.error = "Unable to get chats, Try again later";
      });
  },
});

export const { addUserMessage } = chatSlice.actions;
export default chatSlice.reducer;
