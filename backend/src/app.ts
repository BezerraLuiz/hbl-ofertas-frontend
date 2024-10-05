import fastify from "fastify";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";

const server = fastify({ logger: true });

server.register(cors, {
  origin: true,
});

server.register(fastifyJwt, {
  secret: "n[a(PR3{Gh].9B[nYYX1G%*:#kkaGBey",
});

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
