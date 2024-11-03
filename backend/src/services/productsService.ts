import { prisma } from "../lib/prisma";
import { GetAllProductsResponseDtos } from "../dtos/produtosDto/getAllProductsDtos";
import {
  getProductByNameRequestDto,
  getProductByNameResponseDto,
} from "../dtos/produtosDto/getProductByNameDtos";
import {
  GetProductBySkuRequestDto,
  GetProductBySkuResponseDto,
} from "../dtos/produtosDto/getProductBySkuDtos";
import { DeleteProductRequestDto } from "../dtos/produtosDto/deleteProductDtos";
import { updateProductRequestDto } from "../dtos/produtosDto/updateProductDtos";
import { createProductRequestDto } from "../dtos/produtosDto/createProductDtos";

export async function getAllProducts(): Promise<GetAllProductsResponseDtos> {
  return prisma.produtos.findMany({ orderBy: { nome: "asc" } });
}

export async function getProductByName(
  nome: getProductByNameRequestDto
): Promise<getProductByNameResponseDto> {
  return prisma.produtos.findUniqueOrThrow({ where: { nome } });
}

export async function getProductBySku(
  sku: GetProductBySkuRequestDto
): Promise<GetProductBySkuResponseDto> {
  return prisma.produtos.findMany({ where: { sku } });
}

export async function deleteProduct(id: DeleteProductRequestDto) {
  return prisma.produtos.delete({ where: { id } });
}

export async function updateProduct({
  id,
  nome,
  valor,
  descricao,
  sku,
  imagePath,
}: updateProductRequestDto) {
  return prisma.produtos.update({
    where: { id },
    data: { sku, nome, valor, descricao, imagePath }
  });
}

export async function createProduct({
  sku,
  nome,
  valor,
  descricao,
  imagePath,
}: createProductRequestDto) {
  return prisma.produtos.create({
    data: {
      sku,
      nome,
      valor,
      descricao,
      imagePath
    },
  });
}
