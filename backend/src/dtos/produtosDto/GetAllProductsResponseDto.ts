import {Decimal} from "@prisma/client/runtime/library";

export interface ProdutoDto {
    id: string;
    nome: string;
    valor: Decimal;
    descricao: string;
    imagem: string;
}

export type GetAllProductsResponseDto = ProdutoDto[];