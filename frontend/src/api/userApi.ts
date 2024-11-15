import { authHeaders, BASE_URL, defaultHeaders } from "./config";

export const generateAuthToken = async (email: string, senha: string) => {
  try {
    const response = await fetch(`${BASE_URL}/usuarios`, {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify({ email, senha }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return { error: true, message: responseData.message || "Erro ao gerar token" };
    }

    return { error: false, token: responseData.token, message: "Token gerado com sucesso" };
  } catch {
    return { error: true, message: "Erro na conexão com o servidor." };
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

    const resA = await responseAuthenticate.json();

    if (!responseAuthenticate.ok) {
      return { error: true, message: resA.message || "Erro de autenticação" };
    }

    return { error: false, message: "Autenticação bem-sucedida" };
  } catch {
    return { error: true, message: "Erro na conexão com o servidor." };
  }
};
