import { FastifyReply, FastifyRequest } from "fastify";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../services/productsService";
import { paramsSchema, bodySchema } from "../schemas/productsSchema";
import { getProductBySku } from "../services/productsService";
import { productInterface } from "../interfaces/productInterface";
import { uploadImageHandler } from "./imageController";

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
      products.map(({ id, sku, nome, valor, descricao, imagePath }: productInterface) => ({
        id,
        sku,
        nome,
        valor,
        descricao,
        imagePath
      }))
    );
  } catch (e) {
    console.log(e);
    return reply.status(500).send({ message: "Erro ao buscar os produtos!" });
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

    const { sku } = request.query as {sku: string};

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

export async function updateProductHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { id } = paramsSchema.parse(request.params);
    const { sku, nome, valor, descricao } = bodySchema.parse(request.body);

    const updatedProduct = await updateProduct({
      id,
      sku,
      nome,
      valor,
      descricao,
    });

    return reply.status(200).send(updatedProduct);
  } catch (e) {
    console.log(e);
    return reply
      .status(500)
      .send({ message: "Não foi possível atualizar o produto!" });
  }
}

export async function createProductHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    let sku, nome, valor, descricao;
    let i = 0;

    for await (const part of request.parts()) {
      if (part) {
        switch (part.fieldname) {
          case "nome":
            nome = part.value;
            console.log("Nome recebido:", nome);
            break;
          case "sku":
            sku = part.value;
            console.log("SKU recebido:", sku);
            break;
          case "valor":
            valor = Number(part.value);
            console.log("Valor recebido:", valor);
            break;
          case "descricao":
            descricao = part.value;
            console.log("Descrição recebida:", descricao);
            break;
          default:
            console.log("Break!");
            break;
        }
      }

      i += 1;
      if (i == 4) {
        break;
      }
    }

    console.log("Valores armazenados:", {
      sku,
      nome,
      valor,
      descricao,
    });

    // Garantir que 'valor' não seja undefined
    if (valor === undefined) {
      throw new Error("Valor é obrigatório!");
    }

    console.log("Passou os valores!");
    console.log("Chamando função para upload da imagem!");

    console.log("Antes de chamar uploadImageHandler");
    const imageResponse = await uploadImageHandler(request, reply);
    console.log("Depois de chamar uploadImageHandler");
    console.log("IMAGE RESPONSE = ", imageResponse);

    const imagePath = imageResponse.path;

    await createProduct({ sku, nome, valor, descricao, imagePath });

    return reply.status(201);
  } catch (e) {
    console.error("Erro ao criar produto:", e);
    return reply
      .status(500)
      .send({ message: "Não foi possível criar o produto!" });
  }
}