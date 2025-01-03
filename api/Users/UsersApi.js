export async function validateCredentials(mail, password) {
  try {
    const response = await fetch('https://hbl-ofertas-backend.onrender.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        mail,
        password
      })
    });

    const res = await response.json();

    if (!response.ok) {
      return { error: true, message: res.message };
    }
    
    return { error: false, message: res.message };
  } catch (e) {
    console.log(e);
    return { error: true, message: "Internal Error!" };
  }
}