import { Decimal } from "@prisma/client/runtime/library";
import { z } from "zod";

export const paramsSchema = z.object({
    id: z.number(),
    sku: z.string(),
    nome: z.string(),
    valor: z.number(),
    descricao: z.string(),
    imagePath: z.string(),
    createdAt: z.date(),
})

export const bodySchema = z.object({
    id: z.number(),
    sku: z.string(),
    nome: z.string(),
    valor: z.custom<Decimal>((value) => value instanceof Decimal, {
        message: "O valor precisa ser do tipo Decimal",
    }),
    descricao: z.string(),
    imagePath: z.string(),
    createdAt: z.date(),
})