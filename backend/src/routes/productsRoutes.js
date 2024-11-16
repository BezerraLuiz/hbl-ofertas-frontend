"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRoutes = productsRoutes;
const productsController_1 = require("../controllers/productsController");
function productsRoutes(server) {
    return __awaiter(this, void 0, void 0, function* () {
        server.get("/products", productsController_1.getAllProductsHandler);
        server.get("/products/searchadmin", productsController_1.getProductBySkuHandler);
        server.delete("/products/delete", productsController_1.deleteProductHandler);
        server.put("/products/update", productsController_1.updateProductHandler);
        server.post("/products/create", productsController_1.createProductHandler);
    });
}
