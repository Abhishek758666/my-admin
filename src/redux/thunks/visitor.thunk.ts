import { doGet } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading } from "../slice/loader.slice";
import { TVisitorSchema } from "@/schemas/visitor.schema";

export const getVisitors = createAsyncThunk<TVisitorSchema[]>(
  "get/visitor",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await doGet("/visitor");
      return response;
    } catch (error) {
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);
