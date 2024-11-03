import {prisma} from "../lib/prisma";
import {GetAllProductsResponseDtos} from "../dtos/produtosDto/getAllProductsResponseDtos";
import {
    getProductByNameRequestDto,
    getProductByNameResponseDto
} from "../dtos/produtosDto/getProductByNameDtos";
import {GetProductByIdRequestDto, GetProductByIdResponseDto} from "../dtos/produtosDto/getProductByIdDtos";

export async function getAllProducts(): Promise<GetAllProductsResponseDtos> {
    return prisma.produtos.findMany({orderBy: {nome: 'asc'}});
}

export async function getProductByName(nome: getProductByNameRequestDto): Promise<getProductByNameResponseDto> {
    return prisma.produtos.findUniqueOrThrow({where: {nome}});
}

export async function getProductById(id: GetProductByIdRequestDto): Promise<GetProductByIdResponseDto> {
    return prisma.produtos.findUniqueOrThrow({where: {id}});
}