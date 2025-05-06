import { z } from "zod";
import { stringField } from "./global.schema";

export const BlogSchema = z.object({
  title: stringField("title"),
  excerpt: stringField("excert"),
  tags: z.array(stringField("tags")),
  heroImage: stringField("heroImage"),
  description: stringField("description"),
});
export const BlogResponseSchema = BlogSchema.extend({
  id: stringField("id"),
  createdAt: stringField("createdAt"),
  updatedAt: stringField("updatedAt"),
});

export type TBlogSchema = z.infer<typeof BlogSchema>;
export type TBlogResponseSchema = z.infer<typeof BlogResponseSchema>;
