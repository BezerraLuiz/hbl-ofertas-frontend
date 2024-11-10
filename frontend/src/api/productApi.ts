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
      return { error: true, data: res || { message: "Erro desconhecido" } };
    }

    if (!res || res.length === 0) {
      return { error: true, data: { message: "Nenhum produto encontrado." } };
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

    if (!response.ok) {
      return { error: true, data: res || { message: "Erro desconhecido" } };
    }

    if (!res || res.length === 0) {
      return { error: true, data: { message: "Nenhum produto encontrado." } };
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

export const createProductApi = async (sku: string, nomeProduto: string, valor: number, descricao: string, arquivoImagem: File) => {
  try {
    const formData = new FormData();
    
    formData.append('sku', sku);
    formData.append('nome', nomeProduto);
    formData.append('valor', valor.toString());
    formData.append('descricao', descricao);
    formData.append('image', arquivoImagem);
    
    const imagePathResponse = await uploadImage(nomeProduto, arquivoImagem);
    console.log('Resultado do upload da imagem:', imagePathResponse);

    if (imagePathResponse.error) {
      return { error: true, message: imagePathResponse.data };
    }

    const imagePath = imagePathResponse.data.imagePath;
    console.log('Caminho da imagem:', imagePath);

    console.log('Enviando dados para a API de criação do produto...');
    const response = await fetch(`${BASE_URL}/products/create?imagePath=${imagePath}`, {
      method: "POST",
      body: formData,
    });    

    console.log('Resposta da API de criação do produto:', response.status);

    const res = await response.json();
    console.log('Dados retornados pela API:', res);

    if (!response.ok) {
      console.error('Erro na criação do produto:', res);
      return { error: true, data: res };
    }

    console.log('Produto criado com sucesso:', res);
    return { error: false, data: res };

  } catch (e) {
    console.error('Erro na conexão:', e);
    return {
      error: true,
      data: { message: "Erro na conexão com o servidor." }
    };
  }
};



export const uploadImage = async (nomeProduto: string, arquivoImagem: File) => {
  try {
    console.log("Nome do Produto:", nomeProduto);
    console.log("Arquivo da Imagem:", arquivoImagem);

    nomeProduto = nomeProduto
      .toLowerCase()
      .replace(/\s+/g, "_")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    console.log("Nome do Produto Formatado:", nomeProduto);

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

    console.log("Status da Resposta:", response.status);

    const res = await response.json();

    console.log("Resposta da API:", res);

    if (!response.ok) {
      return { error: true, data: res };
    }

    return { error: false, data: res };
  } catch (e) {
    console.error("Erro no upload da imagem:", e);
    return {
      error: true,
      data: { message: "Erro na conexão com o servidor." },
    };
  }
};
