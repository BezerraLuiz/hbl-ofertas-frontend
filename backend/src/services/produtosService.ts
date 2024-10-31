import {prisma} from "../lib/prisma";

export async function getAllProducts() {
    return prisma.produtos.findMany({orderBy: {nome: 'asc'}});
}

export async function getProductByName(nome: string) {
    return prisma.produtos.findUniqueOrThrow({where: {nome: nome}});
}

export async function getProductById(id: string) {
    return prisma.produtos.findUniqueOrThrow({where: {id}});
}

export async function createProduct() {}
