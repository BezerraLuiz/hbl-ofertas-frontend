import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function usuariosRoutes(app: FastifyInstance) {
  app.post("/usuarios", async (request, reply) => {
    const bodySchema = z.object({
      email: z.string().email(),
      senha: z.string(),
    });

    const { email, senha } = bodySchema.parse(request.body);

    try {
      const usuario = await prisma.usuarios.findUniqueOrThrow({
        where: {
          email,
        },
      });

      const senhaCorreta = senha == usuario.senha

      if (!senhaCorreta) {
        return reply.status(401).send({ error: "Senha Incorreta" });
      };

      return reply.send({ message: "Login bem-sucedido", usuario})

    } catch (error) {
      console.log(error)
      return reply.status(404).send({ error: "Usuário não encontrado "});
    }
  });
}
