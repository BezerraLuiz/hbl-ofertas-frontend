import { FastifyInstance } from "fastify";
import { loginHandler } from "../controllers/usuariosController";

export async function usuariosRoutes(server: FastifyInstance) {
    server.post("/usuarios", loginHandler);

    // rota protegida
    server.get('/protected', { preValidation: [server.authenticate] }, async (request, reply) => {
        return reply.status(200).send({ message: "Você acessou uma rota protegida" });
    });
}
