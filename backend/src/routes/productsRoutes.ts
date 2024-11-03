import {FastifyInstance} from "fastify";
import {
    getAllProductsHandler,
    getProductByNameHandler,
    getProductByIdHandler,
} from "../controllers/productsController";

export async function productsRoutes(server: FastifyInstance) {
    server.get("/products", getAllProductsHandler);
    server.get("/products/searchclient/:nome", getProductByNameHandler);
    server.get("/products/searchadmin/:id", getProductByIdHandler);
    // delete
    // put
    // create
}