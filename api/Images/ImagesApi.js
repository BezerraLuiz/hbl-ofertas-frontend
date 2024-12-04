export async function deleteImage(id) {
  try {
    const response = await fetch(
      `https://hbl-ofertas-backend.onrender.com/uploads?id=${id}`,
      {
        method: "DELETE",
      }
    );

    const res = await response.json();

    if (!response.ok) {
      return { error: true, message: res.message };
    }

    return { error: false, message: res };
  } catch (e) {
    console.log(e);
    return { error: true, message: "Internal Error!" };
  }
}

export async function uploadImage(image) {
  try {
    const formData = new FormData();
    formData.append("file", image);

    const response = await fetch(
      `https://hbl-ofertas-backend.onrender.com/uploads`,
      {
        method: "POST",
        body: formData,
      }
    );

    const res = await response.json();

    if (!response.ok) {
      return { error: true, message: res.message };
    }

    return { error: false, message: res.id };
  } catch (e) {
    console.log(e);
    return { error: true, message: "Internal Error!" };
  }
}
