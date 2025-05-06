import { doGet, doPatch, doPost, doDelete } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading } from "../slice/loader.slice";
import { TTagResponseSchema } from "@/schemas/tag.schema";

interface getTagsArgs {
  token: string;
}
export const getTags = createAsyncThunk<TTagResponseSchema[], getTagsArgs>(
  "get tags",
  async ({ token }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await doGet("/tags", {
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

interface addTagArgs {
  token: string;
  tag: { title: string };
}
export const addTag = createAsyncThunk<TTagResponseSchema, addTagArgs>(
  "add tag",
  async ({ token, tag }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await doPost("/tags", tag, {
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

interface editTagArgs {
  token: string;
  tagId: string;
  updatedTag: { title: string };
}
export const editTag = createAsyncThunk<TTagResponseSchema, editTagArgs>(
  "edit tag",
  async ({ token, tagId, updatedTag }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await doPatch(`/tags/${tagId}`, updatedTag, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      return response.tag;
    } catch (error) {
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

interface deleteTagArgs {
  token: string;
  tagId: string;
}
export const deleteTag = createAsyncThunk<string, deleteTagArgs>(
  "delete tag",
  async ({ token, tagId }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await doDelete(`/tags/${tagId}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      return tagId;
    } catch (error) {
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);
