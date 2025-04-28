import { doGet, doPatch } from "@/lib/axios";
import { TNoteSchema } from "@/schemas/note.schema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading } from "../slice/loader.slice";

interface getNotesArgs {
  token: string;
}
export const getNotes = createAsyncThunk<TNoteSchema[], getNotesArgs>(
  "get notes",
  async ({ token }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await doGet("/notes", {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

interface verifyNoteArgs {
  id: string;
  callback?: () => void;
}
export const verifyNotes = createAsyncThunk<any, verifyNoteArgs>(
  "add notes",
  async ({ id, callback }) => {
    try {
      const response = await doPatch(`/notes/${id}`);

      callback?.();
      return response;
    } catch (error) {
      throw error;
    }
  }
);
