import { z } from "zod";

export const paramsSchema = z.object({
    id: z.string(),
    nome: z.string(),
})

export const bodySchema = z.object({
    id: z.string(),
    nome: z.string(),
    valor: z.number(),
    descricao: z.string(),
})