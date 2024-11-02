import {Decimal} from "@prisma/client/runtime/library";

export interface productInterface {
    id: string;
    nome: string;
    valor: Decimal;
    descricao: string;
}