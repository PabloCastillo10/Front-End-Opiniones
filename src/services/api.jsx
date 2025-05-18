import axios from 'axios';


const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:3000/gestorOpinion'
})


export const getCursos = async () => {
    try {
        const response = await apiClient.get('/cursos/');
        return response.data;
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
}


export const getPublicaciones = async () => {
    try {
        const response = await apiClient.get('/publicaciones/');
        return response.data;
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
}

export const agregarComentario = async (titulo, comentario) => {
 try {
    const response = await apiClient.post(`/comentarios/${titulo}`, comentario);
    return response.data;
  } catch (error) {
    onsole.error('Error al agregar comentario desde API:', error.response?.data || error.message);
    return Promise.reject(error);
 }
};

export const editarComentario = async (id, comentario) => {
  try {
    const response = await apiClient.put(`/comentarios/${id}`, comentario);
    return response.data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};


export const eliminarComentario = async (id) => {
  try {
    const response = await apiClient.delete(`/comentarios/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};