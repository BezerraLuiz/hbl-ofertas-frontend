import { authHeaders, BASE_URL, defaultHeaders } from "./config";

export const generateAuthToken = async (email: string, senha: string) => {
  try {
    const data = { email, senha };

    const responseGenerate = await fetch(`${BASE_URL}/usuarios`, {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify(data),
    });

    if (!responseGenerate.ok) {
      const resG = await responseGenerate.json();
      console.log("Erro ao gerar token:", resG);
      return { error: true, message: resG.message };
    }

    const resG = await responseGenerate.json();
    return { error: false, token: resG.token };
  } catch (e) {
    console.log("Erro na conexão:", e);
    return {
      error: true,
      message: "Erro na conexão com o servidor.",
    };
  }
};

export const authUser = async (email: string, senha: string) => {
  try {
    const tokenResponse = await generateAuthToken(email, senha);

    if (tokenResponse.error) {
      return { error: true, message: tokenResponse.message };
    }

    const responseAuthenticate = await fetch(`${BASE_URL}/protected`, {
      method: "GET",
      headers: authHeaders(tokenResponse.token),
    });

    if (!responseAuthenticate.ok) {
      const resA = await responseAuthenticate.json();
      console.log("Erro na rota protegida:", resA); 
      return { error: true, message: resA.message || "Erro desconhecido" };
    }

    const resA = await responseAuthenticate.json();
    console.log("Resposta da rota protegida:", resA);
    return { error: false, data: resA };
  } catch (e) {
    console.log("Erro na conexão:", e);
    return {
      error: true,
      message: "Erro na conexão com o servidor.",
    };
  }
};