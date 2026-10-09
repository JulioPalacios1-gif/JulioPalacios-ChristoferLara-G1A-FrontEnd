const API_URL = "http://localhost:8080/api/cuentas";

export async function getCuentas() {
  try {
    const response = await fetch(API_URL);
    const result = await response.json();
    if (!response.ok) throw new Error(result.message); 
    return result.data;
  } catch (error) {
    console.error("Error al obtener cuentas:", error);
    throw error;
  }
}



export async function getCuentaById(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);
        return result.data;
    } catch (error) {
        console.error(`Error al obtener cuenta con ID ${id}:`, error);
        throw error;
    }
}


export async function createCuenta(cuenta) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cuenta)
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);
        return result.data;
    } catch (error) {
        console.error(`Error al crear cuenta:`, error);
        throw error;
    }
}

export async function updateCuenta(id, cuenta) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cuenta)
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);
        return result.data;
    } catch (error) {
        console.error(`Error al actualizar cuenta con ID ${id}:`, error);
        throw error;
    }
}

export async function deleteCuenta(id) {
    try{
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);
        return result.data;
    } catch (error) {
        console.error(`Error al eliminar cuenta con ID ${id}:`, error);
        throw error;
    }
}