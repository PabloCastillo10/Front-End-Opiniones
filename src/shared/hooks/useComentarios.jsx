import { useState } from "react";
import { agregarComentario, editarComentario, eliminarComentario } from "../../services/api";

export const useComentarios = (publicacion) => {
  const [comentarios, setComentarios] = useState(publicacion.comentarios || []);
  const [loading, setLoading] = useState(false);

  const onComentar = async (nuevoComentario) => {
  setLoading(true);
  try {
    const { comentario } = await agregarComentario(publicacion.titulo, nuevoComentario);
    setComentarios((prev) => [...prev, comentario]);
    return comentario;
  } catch (error) {
    console.error('Error al comentar:', error);
    return null;
  } finally {
    setLoading(false);
  }
};

  const onEditarComentario = async (id, texto) => {
    setLoading(true);
    try {
      await editarComentario(id, {texto});
      setComentarios((prev) =>
        prev.map((c) => (c._id === id ? { ...c, texto } : c))
      );
    } catch (error) {
      console.error('Error al editar comentario:', error);
    } finally {
      setLoading(false);
    }
  };

  const onEliminarComentario = async (id) => {
    setLoading(true);
    try {
      await eliminarComentario(id);
      setComentarios((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      console.error('Error al eliminar comentario:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    comentarios,
    loading,
    onComentar,
    onEditarComentario,
    onEliminarComentario,
  };
};