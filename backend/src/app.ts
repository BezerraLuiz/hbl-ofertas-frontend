import fastify from "fastify";

const server = fastify({ logger: true });

server.get("/", async (request, reply) => {
  return { message: "SERVER IS ON!" };
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
