import { BASE_URL, defaultHeaders, authHeaders } from "./config";

export const authUser = async (email: string, senha: string) => {
  try {
    const data = { email, senha };

    const responseGenerate = await fetch(`${BASE_URL}/usuarios`, {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify(data),
    });

    const resG = await responseGenerate.json();

    if (!responseGenerate.ok) {
      return { error: true, data: resG || { message: "Erro desconhecido" } };
    }

    const responseAuthenticate = await fetch(`${BASE_URL}/protected`, {
      method: "GET",
      headers: authHeaders(resG.token),
    });

    const resA = await responseAuthenticate.json();

    if (!responseAuthenticate.ok) {
      return { error: true, data: resA || { message: "Erro desconhecido" } };
    }

    return { error: false, data: resA };
  } catch (e) {
    console.log(e);
    return {
      error: true,
      data: { message: "Erro na conexão com o servidor." },
    };
  }
};
