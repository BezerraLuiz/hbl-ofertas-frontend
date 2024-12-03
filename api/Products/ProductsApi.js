export const getAllProducts = async () => {
  try {
    const response = await fetch('https://hbl-ofertas-backend.onrender.com/products', {
      method: 'GET',
    });

    const res = await response.json();

    if (!response.ok) {
      return { error: true, message: 'Unknow Error. Error: ' + res };
    }

    if (!res || res.length === 0) {
      return { error: true, message: 'No products found!' };
    }

    return { error: false, message: res };
  } catch (e) {
    console.log(e);
    return { error: true, message: "Internal Error!" };
  }
}