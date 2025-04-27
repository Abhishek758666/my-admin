import { doPost } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Message } from "../slice/chat.slice";

interface chatResponse {
  prompt: string;
  history: Message[];
  callback?: () => void;
}

export const chat = createAsyncThunk<any, chatResponse>(
  "get Chats",
  async ({ prompt, callback, history }) => {
    try {
      const response = await doPost("/chat", { prompt, history });

      callback?.();
      return response;
    } catch (error) {
      throw error;
    }
  }
);
