import fastify from "fastify";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import { usuariosRoutes } from "./routes/usuarios";
import { produtosRoutes } from "./routes/produtos";

const server = fastify({ logger: true });

server.register(cors, {
  origin: true,
});

server.register(fastifyJwt, {
  secret: "n[a(PR3{Gh].9B[nYYX1G%*:#kkaGBey",
});

server.register(usuariosRoutes);
server.register(produtosRoutes);

server
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("🚀 HTTP server running on http://localhost:3333");
  })
  .catch((err) => {
    console.log(err);
  });
