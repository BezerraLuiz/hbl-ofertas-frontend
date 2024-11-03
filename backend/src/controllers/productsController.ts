import { FastifyReply, FastifyRequest } from "fastify";
import { deleteProduct, getAllProducts } from "../services/productsService";
import { paramsSchema, bodySchema } from "../schemas/productsSchema";
import { getProductBySku, getProductByName } from "../services/productsService";
import { productInterface } from "../interfaces/productInterface";

export async function getAllProductsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const products = await getAllProducts();

    if (products.length === 0) {
      return reply
        .status(404)
        .send({ message: "Não há produtos cadastrados!" });
    }

    return reply.status(200).send(
      products.map(
        ({
          id,
          sku,
          nome,
          valor,
          descricao,
        }: productInterface) => ({ id, sku, nome, valor, descricao })
      )
    );
  } catch (e) {
    console.log(e);
    return reply.status(500).send({ message: "Erro ao buscar os produtos!" });
  }
}

export async function getProductByNameHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const products = await getAllProducts();

    if (products.length === 0) {
      return reply
        .status(404)
        .send({ message: "Não há produtos cadastrados!" });
    }

    const { nome } = paramsSchema.parse(request.params);

    const product = await getProductByName(nome);

    if (!product) {
      return reply.status(404).send({ message: "Produto não encontrado!" });
    }

    return reply.status(200).send(product);
  } catch (e) {
    console.log(e);
    return reply.status(500).send({ message: "Erro ao procurar o produto!" });
  }
}

export async function getProductBySkuHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const products = await getAllProducts();

    if (products.length === 0) {
      return reply
        .status(404)
        .send({ message: "Não há produtos cadastrados!" });
    }

    const { sku } = paramsSchema.parse(request.params);

    const product = await getProductBySku(sku);
    if (!product) {
      return reply.status(404).send({ message: "Produto não encontrado!" });
    }

    return reply.status(200).send(product);
  } catch (e) {
    console.log(e);
    return reply.status(500).send({ message: "Erro ao procurar produto!" });
  }
}

export async function deleteProductHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const products = await getAllProducts();

    if (products.length === 0) {
      return reply
        .status(404)
        .send({ message: "Não há produtos cadastrados!" });
    }

    const { id } = paramsSchema.parse(request.params);

    const deletedProduct = await deleteProduct(id);
    if (!deletedProduct) {
      return reply.status(404).send({ message: "Produto não encontrado!" });
    }

    return reply.status(200).send(deletedProduct);
  } catch (e) {
    console.log(e);
    return reply.status(500).send({ message: "Erro ao procurar produto!" });
  }
}

// export async function updateProductHandler(
//   request: FastifyRequest,
//   reply: FastifyReply
// ) {
//   try {
//     const { id } = paramsSchema.parse(request.params);
//     const { nome, valor, descricao } = bodySchema.parse(request.body);
    
//     const updatedProduct = await updateProduct({ id, sku, nome, valor, descricao });
    
//     return reply.status(200).send(updatedProduct);
//   } catch (e) {
//     console.log(e);
//     return reply.status(500).send({ message: "Não foi possível atualizar o produto!" });
//   }
// }
