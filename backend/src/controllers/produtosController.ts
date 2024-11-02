import { FastifyReply, FastifyRequest } from "fastify";
import { getAllProducts} from "../services/produtosService";
import { paramsSchema, bodySchema } from "../schemas/produtosSchema";
import {getProductById, getProductByName} from "../services/produtosService";

export async function getAllProductsHandler() {
  const produtos = await getAllProducts();
  return produtos.map(({ id, nome, valor, descricao }) => ({ id, nome, valor, descricao }));
}

export async function getProductByNameHandler(req: FastifyRequest) {
  const { nome } = paramsSchema.parse(req.params);
  return getProductByName(nome);
}

export async function getProductByIdHandler(req: FastifyRequest) {
  const { id } = paramsSchema.parse(req.params);
  return getProductById(id);
}
