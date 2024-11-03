import { FastifyReply, FastifyRequest } from "fastify";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../services/productsService";
import { paramsSchema, bodySchema } from "../schemas/productsSchema";
import { getProductBySku, getProductByName } from "../services/productsService";
import { productInterface } from "../interfaces/productInterface";
import path from "path";
import fs from "fs";
import { pump } from "../lib/pump";
import { MultipartFile } from "fastify-multipart";

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

    return reply
      .status(200)
      .send(
        products.map(
          ({ id, sku, nome, valor, descricao }: productInterface) => ({
            id,
            sku,
            nome,
            valor,
            descricao,
          })
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

export async function updateProductHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { id } = paramsSchema.parse(request.params);
    const { sku, nome, valor, descricao, imagePath } = bodySchema.parse(
      request.body
    );

    const updatedProduct = await updateProduct({
      id,
      sku,
      nome,
      valor,
      descricao,
      imagePath,
    });

    return reply.status(200).send(updatedProduct);
  } catch (e) {
    console.log(e);
    return reply
      .status(500)
      .send({ message: "Não foi possível atualizar o produto!" });
  }
}

export async function createProductHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { sku, nome, valor, descricao } = bodySchema.parse(request.body);
    
    let data: MultipartFile | undefined;
    for await (const file of request.files()) {
      if (file.fieldname === 'image') {
        data = file;
        break;
      }
    }

    if (!data || !sku || !nome || !valor || !descricao) {
      return reply.status(400).send({ message: "Falta preencher informações do produto!" });
    }

    const timestamp = Date.now();
    const imagePath = `assets/${nome}_${timestamp}${path.extname(data.filename)}`;
    const imagePathDb = path.join(__dirname, '../frontend/assets', imagePath);

    if (!data.file) {
      return reply.status(400).send({ message: "Arquivo não encontrado!" });
    }

    await pump(data.file, fs.createWriteStream(imagePathDb));

    const existingProduct = (await getAllProducts()).find((p) => p.sku === sku);
    if (existingProduct) {
      return reply.status(401).send({ message: "Produto já cadastrado!" });
    }

    const product = await createProduct({ sku, nome, valor, descricao, imagePath });
    return reply.status(201).send(product);
  } catch (e) {
    console.error(e);
    return reply.status(500).send({ message: "Não foi possível criar o produto!" });
  }
}
