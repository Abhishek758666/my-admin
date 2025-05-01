import { z } from "zod";
import { stringField } from "./global.schema";

export const BlogSchema = z.object({
  id: stringField("id"),
  title: stringField("title"),
  excert: stringField("excert"),
  description: stringField("description"),
  createdAt: stringField("createdAt"),
  updatedAt: stringField("updatedAt"),
});

export type TBlogSchema = z.infer<typeof BlogSchema>;
