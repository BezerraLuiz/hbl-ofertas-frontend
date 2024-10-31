import { FastifyInstance } from "fastify";

export function generateToken(payload: object) {
    return server.jwt.sign(payload);
}
