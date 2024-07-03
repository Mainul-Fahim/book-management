import { z } from "zod";

export const createBookValidationSchema = z.object({
    body: z.object({
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
      }),
  });


  export const updateBookValidationSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        price: z.number().optional(),
        quantity: z.number().optional(),
      }),
  });