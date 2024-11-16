import { BASE_URL, defaultHeaders } from "./config";

export const searchBySku = async (sku: string) => {
  try {
    sku.toUpperCase().replace(" ", "%20");

    const response = await fetch(
      `${BASE_URL}/products/searchadmin?sku=${sku}`,
      {
        method: "GET",
        headers: defaultHeaders,
      }
    );

    const res = await response.json();

    if (!response.ok) {
      return { error: true, message: res };
    }

    if (!res || res.length === 0) {
      return { error: true, message: "Nenhum produto encontrado." };
    }

    return { error: false, data: res };
  } catch (e) {
    console.log(e);
    return {
      error: true,
      data: { message: "Erro na conexão com o servidor." },
    };
  }
};

export const getAllProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: "GET",
      headers: defaultHeaders,
    });

    const res = await response.json();

    if (!response.ok || !res || res.length === 0) {
      return {
        error: true,
        message: res?.message || "Nenhum produto encontrado.",
      };
    }

    return { error: false, message: res };
  } catch (e) {
    console.log(e);
    return { error: true, message: "Erro na conexão com o servidor." };
  }
};

export const createProductApi = async (
  sku: string,
  nomeProduto: string,
  valor: number,
  descricao: string,
  arquivoImagem: File
) => {
  try {
    const formData = new FormData();

    formData.append("sku", sku.toUpperCase());
    formData.append("nome", nomeProduto);
    formData.append("valor", valor.toString());
    formData.append("descricao", descricao);
    formData.append("image", arquivoImagem);

    const imagePathResponse = await uploadImage(nomeProduto, arquivoImagem);

    if (imagePathResponse.error) {
      return { error: true, message: imagePathResponse.message };
    }

    const imagePath = imagePathResponse.message;
    const response = await fetch(
      `${BASE_URL}/products/create?imagePath=${imagePath}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const res = await response.json();

    if (!response.ok) {
      return {
        error: true,
        message: res?.message || "Erro na criação do produto.",
      };
    }

    return { error: false, message: res };
  } catch (e) {
    console.error("Erro na conexão:", e);
    return { error: true, message: "Erro na conexão com o servidor." };
  }
};

export const uploadImage = async (nomeProduto: string, arquivoImagem: File) => {
  try {
    nomeProduto = nomeProduto
      .toLowerCase()
      .replace(/\s+/g, "_")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    const formData = new FormData();
    formData.append("nome", nomeProduto);
    formData.append("image", arquivoImagem);

    const response = await fetch(
      `${BASE_URL}/upload-image?nome=${nomeProduto}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const res = await response.json();

    if (!response.ok) {
      return {
        error: true,
        message: res?.message || "Erro no upload da imagem.",
      };
    }

    return {
      error: false,
      message: res?.imagePath || "Imagem carregada com sucesso.",
    };
  } catch (e) {
    console.error("Erro no upload da imagem:", e);
    return { error: true, message: "Erro na conexão com o servidor." };
  }
};

export const deleteProduct = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/products/delete?id=${id}`, {
      method: "DELETE",
    });

    const res = await response.json();

    if (!response.ok) {
      return { error: true, message: res?.message || "Erro desconhecido" };
    }

    return {
      error: false,
      message: res?.message || "Produto deletado com sucesso.",
    };
  } catch (e) {
    console.log(e);
    return { error: true, message: "Erro na conexão com o servidor." };
  }
};

export const updateProduct = async (
  id: number,
  sku: string,
  nome: string,
  valor: number,
  descricao: string
) => {
  try {
    const response = await fetch(`${BASE_URL}/products/update?id=${id}`, {
      method: "PUT",
      headers: defaultHeaders,
      body: JSON.stringify({ sku, nome, valor, descricao }),
    });

    const res = await response.json();

    if (!response.ok) {
      return {
        error: true,
        message: res?.message || "Erro na atualização do produto.",
      };
    }

    return {
      error: false,
      message: res?.message || "Produto atualizado com sucesso.",
    };
  } catch (e) {
    console.log(e);
    return { error: true, message: "Erro na conexão com o servidor." };
  }
};
