import { useState } from "react";
import { getPublicaciones } from "../../services/api";

export const usePublicaciones = () => {
  const [publicaciones, setPublicaciones] = useState([]);

  const handleGetPublicaciones = async () => {
    try {
      const response = await getPublicaciones();
      console.log(response);
      setPublicaciones(response.publicaciones);
    } catch (error) {
      console.error("Error al obtener publicaciones : ", error);
    }
  };

  return { publicaciones, handleGetPublicaciones };
};