import {FastifyInstance} from "fastify";
import {
    getAllProductsHandler,
    getProductByNameHandler,
    getProductByIdHandler,
} from "../controllers/produtosController";

export async function produtosRoutes(server: FastifyInstance) {
    server.get("/products", getAllProductsHandler);
    server.get("/products/searchclient/:nome", getProductByNameHandler);
    server.get("/products/searchadmin/:id", getProductByIdHandler);
    // delete
    // put
    // create
}