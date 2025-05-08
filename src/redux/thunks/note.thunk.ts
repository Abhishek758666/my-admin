import { doDelete, doGet, doPatch } from "@/lib/axios";
import { TNoteSchema } from "@/schemas/note.schema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading } from "../slice/loader.slice";

export const getNotes = createAsyncThunk<TNoteSchema[]>(
  "get notes",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await doGet("/notes");
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
}
export const toggleNote = createAsyncThunk<string, verifyNoteArgs>(
  "toggle notes",
  async ({ id }, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      await doPatch(`/notes/${id}`);
      return id;
    } catch (error) {
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const deleteNote = createAsyncThunk<string, verifyNoteArgs>(
  "delete notes",
  async ({ id }, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      await doDelete(`/notes/${id}`);
      return id;
    } catch (error) {
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);
