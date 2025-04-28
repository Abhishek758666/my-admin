import { doGet } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading } from "../slice/loader.slice";
import { TVisitorSchema } from "@/schemas/visitor.schema";

interface GetVisitorsArgs {
  token: string;
}
export const getVisitors = createAsyncThunk<TVisitorSchema[], GetVisitorsArgs>(
  "get/visitor",
  async ({ token }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await doGet("/visitor", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);
