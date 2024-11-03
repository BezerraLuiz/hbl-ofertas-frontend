import {FastifyInstance} from "fastify";
import {
    getAllProductsHandler,
    getProductByNameHandler,
    getProductBySkuHandler,
    deleteProductHandler,
} from "../controllers/productsController";

export async function productsRoutes(server: FastifyInstance) {
    server.get("/products", getAllProductsHandler);
    server.get("/products/searchclient/:nome", getProductByNameHandler);
    server.get("/products/searchadmin/:id", getProductBySkuHandler);
    server.delete("/products/delete/:id", deleteProductHandler)
    // put
    // create
}