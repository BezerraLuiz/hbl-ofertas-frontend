import {FastifyInstance} from "fastify";
import {
    getAllProductsHandler,
    getProductByNameHandler,
    getProductBySkuHandler,
    deleteProductHandler,
    updateProductHandler,
    createProductHandler,
} from "../controllers/productsController";

export async function productsRoutes(server: FastifyInstance) {
    server.get("/products", getAllProductsHandler);
    server.get("/products/searchclient/:nome", getProductByNameHandler);
    server.get("/products/searchadmin/:id", getProductBySkuHandler);
    server.delete("/products/delete/:id", deleteProductHandler)
    server.put("/products/update/:id", updateProductHandler)
    server.post("/products/create", createProductHandler)
}