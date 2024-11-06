import { BASE_URL, defaultHeaders } from "./config";

export const searchByNome = async (nome: string) => {
  try {
    const response = await fetch(`${BASE_URL}/products/searchclient?nome=${nome.toLowerCase().replace(" ", "_")}`, {
      method: 'GET',
      headers: defaultHeaders,
    });

    const res = await response.json();

    if (!response.ok) {
      return { error: true, data: res || { message: 'Erro desconhecido' } };
    }

    // Verifique se a resposta contém dados úteis
    if (!res || res.length === 0) {
      return { error: true, data: { message: 'Nenhum produto encontrado.' } };
    }

    return { error: false, data: res };
  } catch (e) {
    console.log(e);
    return { error: true, data: { message: "Erro na conexão com o servidor." } };
  }
};

export const searchBySku = async (sku: string) => {
  try {
    const response = await fetch(`${BASE_URL}/products/searchadmin?sku=${sku.toUpperCase().replace(" ", "%20")}`, {
      method: 'GET',
      headers: defaultHeaders,
    });

    const res = await response.json();

    if (!response.ok) {
      return { error: true, data: res || { message: 'Erro desconhecido' } };
    }

    // Verifique se a resposta contém dados úteis
    if (!res || res.length === 0) {
      return { error: true, data: { message: 'Nenhum produto encontrado.' } };
    }

    return { error: false, data: res };
  } catch (e) {
    console.log(e);
    return { error: true, data: { message: "Erro na conexão com o servidor." } };
  }
};
