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
  token: string;
}
export const toggleNote = createAsyncThunk<string, verifyNoteArgs>(
  "add notes",
  async ({ id, token }, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      await doPatch(
        `/notes/${id}`,
        {},
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      return id;
    } catch (error) {
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);
