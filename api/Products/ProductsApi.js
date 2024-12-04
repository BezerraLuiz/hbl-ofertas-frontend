export async function getAllProducts() {
  try {
    const response = await fetch(
      "https://hbl-ofertas-backend.onrender.com/products/all",
      {
        method: "GET",
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

export async function getProductBySku(sku) {
  try {
    const response = await fetch(
      `https://hbl-ofertas-backend.onrender.com/products?sku=${sku}`,
      {
        method: "GET",
      }
    );

    const res = await response.json();

    if (!response.ok) {
      return { error: true, message: res.message };
    }

    return { error: false, message: res.product };
  } catch (e) {
    console.log(e);
    return { error: true, message: "Internal Error!" };
  }
}

export async function deleteProduct(sku) {
  try {
    const response = await fetch(
      `https://hbl-ofertas-backend.onrender.com/products/delete?sku=${sku}`,
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

export async function updateProduct(id, sku, name, price, description) {
  try {
    const response = await fetch(
      `https://hbl-ofertas-backend.onrender.com/products/update?id=${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sku,
          name,
          price,
          description,
        }),
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

export async function createProduct(sku, name, price, description, imageId) {
  try {
    const response = await fetch(
      `https://hbl-ofertas-backend.onrender.com/products`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sku,
          name,
          price,
          description,
          imageId
        }),
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
