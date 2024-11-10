import { BASE_URL, defaultHeaders } from "./config";

export const searchBySku = async (sku: string) => {
  try {
    sku.toUpperCase().replace(" ", "%20")

    const response = await fetch(`${BASE_URL}/products/searchadmin?sku=${sku}`, {
      method: 'GET',
      headers: defaultHeaders,
    });

    const res = await response.json();

    if (!response.ok) {
      return { error: true, data: res || { message: 'Erro desconhecido' } };
    }

    if (!res || res.length === 0) {
      return { error: true, data: { message: 'Nenhum produto encontrado.' } };
    }

    return { error: false, data: res };
  } catch (e) {
    console.log(e);
    return { error: true, data: { message: "Erro na conexão com o servidor." } };
  }
};

export const getAllProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: 'GET',
      headers: defaultHeaders,
    });

    const res = await response.json();

    if (!response.ok) {
      return { error: true, data: res || { message: 'Erro desconhecido' } };
    }

    if (!res || res.length === 0) {
      return { error: true, data: { message: 'Nenhum produto encontrado.' } };
    }

    return { error: false, data: res };
  } catch (e) {
    console.log(e);
    return { error: true, data: { message: "Erro na conexão com o servidor." } };
  }
}