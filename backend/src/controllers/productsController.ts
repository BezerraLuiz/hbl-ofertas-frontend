import { FastifyReply, FastifyRequest } from "fastify";
import { getAllProducts } from "../services/productsService";
import { paramsSchema } from "../schemas/productsSchema";
import { getProductById, getProductByName } from "../services/productsService";
import { productInterface } from "../interfaces/productInterface";
import { Decimal } from "@prisma/client/runtime/library";

export async function getAllProductsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const produtos = await getAllProducts();

    if (produtos.length === 0) {
      return reply
        .status(404)
        .send({ message: "Não há produtos cadastrados!" });
    }

    return reply.status(200).send(
      produtos.map(
        ({
          id,
          nome,
          valor,
          descricao,
        }: productInterface): {
          id: string;
          nome: string;
          valor: Decimal;
          descricao: string;
        } => ({ id, nome, valor, descricao })
      )
    );
  } catch (e) {
    console.log(e);
    return reply.status(500).send({ message: "Erro ao buscar os produtos!" });
  }
}

export async function getProductByNameHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const produtos = await getAllProducts();

    if (produtos.length === 0) {
      return reply
        .status(404)
        .send({ message: "Não há produtos cadastrados!" });
    }

    const { nome } = paramsSchema.parse(request.params);

    const produto = await getProductByName(nome);

    if (!produto) {
      return reply.status(404).send({ message: "Produto não encontrado!" });
    }

    return reply.status(200).send(produto);
  } catch (e) {
    console.log(e);
    return reply.status(500).send({ message: "Erro ao procurar o produto!" });
  }
}

export async function getProductByIdHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
      const produtos = await getAllProducts();
    
      if (produtos.length === 0) {
        return reply.status(404).send({ message: "Não há produtos cadastrados!" });
      }
    
      const { id } = paramsSchema.parse(request.params);
      
      const produto = await getProductById(id);
      if(!produto) {
        return reply.status(404).send({ message: "Produto não encontrado!" })
      }
      
      return reply.status(200).send(produto);
  } catch (e) {
    console.log(e);
    return reply.status(500).send({ message: "Erro ao procurar produto!" });
  }
}
