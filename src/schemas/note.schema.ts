import { z } from "zod";
import { booleanField, stringField } from "./global.schema";

export const NoteSchema = z.object({
  id: stringField("id"),
  image: stringField("image"),
  name: stringField("name"),
  message: stringField("message"),
  verified: booleanField("verified"),
  createdAt: stringField("createdAt"),
  updatedAt: stringField("updatedAt"),
});

export type TNoteSchema = z.infer<typeof NoteSchema>;
