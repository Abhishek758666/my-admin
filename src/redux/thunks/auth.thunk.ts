import { doPost } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TLoginResponseSchema } from "@/schemas/auth.schema";
import { setLoading } from "../slice/loader.slice";

interface LoginArgs {
  data: {
    email: string;
    password: string;
  };
  callback?: () => void;
}

export const Login = createAsyncThunk<TLoginResponseSchema, LoginArgs>(
  "login",
  async ({ data, callback }, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const response = await doPost("/login", data);

      callback?.();
      return response;
    } catch (error) {
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);
