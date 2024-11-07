import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { findUserByEmail, verifyPassword } from "../services/userService";
import { generateToken } from "../utils/jwtUtils";

export async function loginHandler(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    email: z.string().email(),
    senha: z.string(),
  });

  const { email, senha } = bodySchema.parse(request.body);

  try {
    const usuario = await findUserByEmail(email);

    if (!usuario) {
      return reply.status(401).send({ error: "Usuário não encontrado" });
    }

    const senhaCorreta = await verifyPassword(senha, usuario.senha);

    if (!senhaCorreta) {
      return reply.status(401).send({ error: "Senha Incorreta" });
    }

    console.log({ id: usuario.id, email: usuario.email });

    const token = generateToken({ id: usuario.id, email: usuario.email });

    return { token };
  } catch (error) {
    console.log(error);
    return reply.status(500).send({ error: "Erro interno do servidor" });
  }
}
