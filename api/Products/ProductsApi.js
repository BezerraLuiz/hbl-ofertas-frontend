export async function getAllProducts () {
  try {
    const response = await fetch('https://hbl-ofertas-backend.onrender.com/products/all', {
      method: 'GET',
    });

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

export async function getProductBySku (sku) {
  try {
    const response = await fetch(`https://hbl-ofertas-backend.onrender.com/products?sku=${sku}`, {
      method: 'GET',
    });

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