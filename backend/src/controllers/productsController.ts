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
      products.map(({ id, sku, nome, valor, descricao }: productInterface) => ({
        id,
        sku,
        nome,
        valor,
        descricao,
      }))
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
    let sku, nome, valor, descricao, imagePath; // Declare as variáveis para armazenar os valores

    for await (const part of request.parts()) {
      if (!part.file) {
        // Verifica se a parte não é um arquivo
        switch (part.fieldname) {
          case "nome":
            nome = part.value; // Salva o valor do Nome na variável nome
            console.log("Nome recebido:", nome);
            break;
          case "sku":
            sku = part.value; // Salva o valor do SKU na variável sku
            console.log("SKU recebido:", sku);
            break;
          case "valor":
            valor = Number(part.value); // Salva o valor convertido para número na variável valor
            console.log("Valor recebido:", valor);
            break;
          case "descricao":
            descricao = part.value; // Salva o valor da Descrição na variável descricao
            console.log("Descrição recebida:", descricao);
            break;
          case "imagePath":
            imagePath = part.value; // Salva o valor do Image Path na variável imagePath
            console.log("Image Path recebido:", imagePath);
            break;
          default:
            console.log("Campo desconhecido:", part.fieldname);
            break; // Adicionando break aqui também
        }
      } else {
        // Aqui você pode tratar o upload de arquivos, se necessário
        console.log("Arquivo recebido:", part);
      }
      break;
    }

    // Após o loop, você pode usar as variáveis conforme necessário
    console.log("Valores armazenados:", {
      sku,
      nome,
      valor,
      descricao,
      imagePath,
    });

    // const existingProduct = (await getAllProducts()).find((p) => p.sku === productData.sku);
    // if (existingProduct) {
    //   return reply.status(401).send({ message: "Produto já cadastrado!" });
    // }

    const imageResponse = await uploadImageHandler(nome, request, reply);
    console.log("IMAGE RESPONSE = ", imageResponse);

    // const product = await createProduct({
    //   sku: productData.sku,
    //   nome: productData.nome,
    //   valor: productData.valor,
    //   descricao: productData.descricao,
    //   imagePath: imageResponse.imagePath,
    // });

    return reply.status(201);
  } catch (e) {
    console.error(e);
    return reply
      .status(500)
      .send({ message: "Não foi possível criar o produto!" });
  }
}
