import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

// pagina cliente
// ver todos os produtos
// pesquisar produto por nome

// pagina admin
// pesquisar produto pelo id
// cadastrar produto
// editar produto
// deletar produto

export async function produtosRoutes(server: FastifyInstance) {
  // pagina clientes
  // retornar todos os produtos
  server.get("/produtos", async () => {
    const produtos = await prisma.produtos.findMany({
      orderBy: {
        nome: "asc",
      },
    });

    return produtos.map((produto) => {
      return {
        id: produto.id,
        nome: produto.nome,
        valor: produto.valor,
        descricao: produto.descricao,
      };
    });
  });

  // pesquisar produto por nome
  server.get("/produtos/searchclient/:nome", async (request) => {
    const paramsSchema = z.object({
      nome: z.string(),
    });

    const { nome } = paramsSchema.parse(request.params);

    const produto = await prisma.produtos.findUniqueOrThrow({
      where: {
        nome,
      },
    });

    return produto;
  });

  // pagina admin
  // pesquisar produto pelo id
  server.get("/produtos/searchadmin/:id", async (request) => {
    const paramsSchema = z.object({
      id: z.string(),
    });

    const { id } = paramsSchema.parse(request.params);

    const produto = await prisma.produtos.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return produto;
  });

  // cadastrar produto
  server.post("/produtos", async (request, reply) => {
    const bodySchema = z.object({
      id: z.string(),
      nome: z.string(),
      valor: z.number(),
      descricao: z.string(),
    });

    const { id, nome, valor, descricao } = bodySchema.parse(request.body);

    try {
      const produto = await prisma.usuarios.create({
        data: {
          id,
          nome,
          valor,
          descricao,
        },
      });

      return produto;
    } catch (error) {
      console.log(error)
      return reply.status(500).send({ error: "Erro ao criar produto"})
    }
  });
}
