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
import { DeleteProductRequestDto } from "../dtos/produtosDto/deleteProductDto";
import { updateProductRequestDto } from "../dtos/produtosDto/updateProductDto";

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

// export async function updateProduct({ id, nome, valor, descricao, sku }: updateProductRequestDto) {
//     const product = await prisma.produtos.update({
//         where: { id },
//         data: { sku, nome, valor, descricao },
//     });

//     return product;
// }
