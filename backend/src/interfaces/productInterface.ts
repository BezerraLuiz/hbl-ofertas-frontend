import {Decimal} from "@prisma/client/runtime/library";

export interface productInterface {
    id: number;
    sku: string;
    nome: string;
    valor: Decimal;
    descricao: string;
}