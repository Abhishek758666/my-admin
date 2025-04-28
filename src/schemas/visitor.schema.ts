import z from "zod";
import { stringField } from "./global.schema";
export const VisitorSchema = z.object({
  date: stringField("date"),
  visitor: stringField("visitor"),
});

export type TVisitorSchema = z.infer<typeof VisitorSchema>;
