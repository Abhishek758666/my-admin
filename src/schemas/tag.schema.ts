import z from "zod";
import { stringField } from "./global.schema";

export const tagSchema = z.object({
  title: stringField("title", 5),
});

export const tagResponseSchema = tagSchema.extend({
  id: stringField("id"),
  createdAt: stringField("createdAt"),
  updatedAt: stringField("updatedAt"),
});

export type TTagSchema = z.infer<typeof tagSchema>;
export type TTagResponseSchema = z.infer<typeof tagResponseSchema>;
