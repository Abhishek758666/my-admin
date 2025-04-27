import { z } from "zod";
import { stringField } from "./global.schema";

export const NoteSchema = z.object({
  id: stringField("id"),
  image: stringField("image"),
  name: stringField("name"),
  message: stringField("message"),
  verified: stringField("verified"),
  createdAt: stringField("createdAt"),
  updatedAt: stringField("updatedAt"),
});

export type TNoteSchema = z.infer<typeof NoteSchema>;
