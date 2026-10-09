const API_URL = "http://localhost:8080/api/usuarios";

export async function getUsuarios() {
  try {
    const response = await fetch(API_URL);
    const result = await response.json();
    if (!response.ok) throw new Error(result.message); 
    return result.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
}


export async function getUsuarioById(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);
        return result.data;
    } catch (error) {
        console.error(`Error al obtener usuario con ID ${id}:`, error);
        throw error;
    }
}