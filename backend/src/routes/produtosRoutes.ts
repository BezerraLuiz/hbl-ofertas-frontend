import {FastifyInstance} from "fastify";
import {
    getAllProductsHandler,
    getProductByNameHandler,
    getProductByIdHandler,
    createProductHandler
} from "../controllers/produtosController";

export async function produtosRoutes(server: FastifyInstance) {
    server.get("/produtos", getAllProductsHandler);
    server.get("/produtos/searchclient/:nome", getProductByNameHandler);
    server.get("/produtos/searchadmin/:id", getProductByIdHandler);
    server.post("/produtos", createProductHandler);
}