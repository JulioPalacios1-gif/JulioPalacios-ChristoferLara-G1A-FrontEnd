const API_URL = "http://localhost:8080/api/movimientos";

export async function getMovimientos() {
  try {
    const response = await fetch(API_URL);
    const result = await response.json();
    if (!response.ok) throw new Error(result.message); 
    return result.data;
  } catch (error) {
    console.error("Error al obtener movimientos:", error);
    throw error;
  }
}



export async function getMovimientoById(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);
        return result.data;
    } catch (error) {
        console.error(`Error al obtener movimiento con ID ${id}:`, error);
        throw error;
    }
}


export async function createMovimiento(movimiento) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(movimiento)
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);
        return result.data;
    } catch (error) {
        console.error(`Error al crear movimiento:`, error);
        throw error;
    }
}

export async function updateMovimiento(id, movimiento) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(movimiento)
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);
        return result.data;
    } catch (error) {
        console.error(`Error al actualizar movimiento con ID ${id}:`, error);
        throw error;
    }
}

export async function deleteMovimiento(id) {
    try{
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);
        return result.data;
    } catch (error) {
        console.error(`Error al eliminar movimiento con ID ${id}:`, error);
        throw error;
    }
}