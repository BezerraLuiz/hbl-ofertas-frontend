import { FastifyInstance } from "fastify";
import { prisma } from "./lib/prisma";
import { z } from "zod";
import { FastifyRequest } from "fastify/types/request";
import { FastifyReply } from "fastify/types/reply";
import bcrypt from 'bcryptjs';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
};

export async function usuariosRoutes(server: FastifyInstance) {
  // autenticar login
  server.post("/usuarios", async (request, reply) => {
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
      
      const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

      if (!senhaCorreta) {
        return reply.status(401).send({ error: "Senha Incorreta" });
      };

      const token = server.jwt.sign({ id: usuario.id, email: usuario.email });

      return reply.status(200).send({ token });

    } catch (error) {
      console.log(error)
      return reply.status(404).send({ error: "Usuário não encontrado"});
    }
  });

  // middleware para autenticar usando jwt
  server.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (error) {
      reply.status(500).send({ message: error });
    }
  });

  // rota protegida
  server.get('/protected', {preValidation: [server.authenticate] }, async (request, reply) => {
    return reply.status(200).send({ message: "Você acessou uma rota protegida" });
  });
}