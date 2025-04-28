import { z } from "zod";
import { emailField, passwordField, stringField } from "./global.schema";

export const LoginSchema = z.object({
  email: emailField("email"),
  password: passwordField("password"),
});
export const LoginResponseSchema = z.object({
  message: stringField("message"),
  email: stringField("email"),
  userImage: stringField("userImage"),
  username: stringField("username"),
  token: stringField("token"),
});

export type TLoginResponseSchema = z.infer<typeof LoginResponseSchema>;
export type TLoginSchema = z.infer<typeof LoginSchema>;
