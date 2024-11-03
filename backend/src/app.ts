import fastify from "fastify";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import { usuariosRoutes } from "./routes/userRoutes";
import { productsRoutes } from "./routes/productsRoutes";
import fastifyMultipart from "@fastify/multipart";
import { authenticate } from "./middlewares/authenticateMiddleware";

const server = fastify({ logger: true });

server.register(cors, {
  origin: true,
});

server.register(fastifyJwt, {
  secret: "n[a(PR3{Gh].9B[nYYX1G%*:#kkaGBey",
});

authenticate(server).then(e => console.log(e));

server.register(fastifyMultipart);

server.register(usuariosRoutes);
server.register(productsRoutes);

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
