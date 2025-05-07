import { doGet, doPatch, doPost, doDelete } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading } from "../slice/loader.slice";
import { TTagResponseSchema } from "@/schemas/tag.schema";

export const getTags = createAsyncThunk<TTagResponseSchema[]>(
  "get tags",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await doGet("/tags");
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

interface addTagArgs {
  tag: { title: string };
}
export const addTag = createAsyncThunk<TTagResponseSchema, addTagArgs>(
  "add tag",
  async ({ tag }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await doPost("/tags", tag);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

interface editTagArgs {
  tagId: string;
  updatedTag: { title: string };
}
export const editTag = createAsyncThunk<TTagResponseSchema, editTagArgs>(
  "edit tag",
  async ({ tagId, updatedTag }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await doPatch(`/tags/${tagId}`, updatedTag);
      return response.tag;
    } catch (error) {
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

interface deleteTagArgs {
  tagId: string;
}
export const deleteTag = createAsyncThunk<string, deleteTagArgs>(
  "delete tag",
  async ({ tagId }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await doDelete(`/tags/${tagId}`);
      return tagId;
    } catch (error) {
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);
