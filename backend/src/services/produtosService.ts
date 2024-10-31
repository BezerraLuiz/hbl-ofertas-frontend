import {prisma} from "../lib/prisma";
import {GetAllProductsResponseDto} from "../dtos/produtosDto/GetAllProductsResponseDto";

export async function getAllProducts(): Promise<GetAllProductsResponseDto> {
    return prisma.produtos.findMany({orderBy: {nome: 'asc'}});
}

export async function getProductByName(nome: string): Promise<any> {
    return prisma.produtos.findUniqueOrThrow({where: {nome: nome}});
}

export async function getProductById(id: string) {
    return prisma.produtos.findUniqueOrThrow({where: {id}});
}

export async function createProduct() {
}
