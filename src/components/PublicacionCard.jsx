import React, { useState } from 'react';
import {
  Box, Typography, Button, Collapse, TextField, IconButton
} from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import TitleIcon from '@mui/icons-material/Title';
import ArticleIcon from '@mui/icons-material/Article';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useComentarios } from '../shared/hooks/useComentarios';
import { ComentarioCard } from './ComentarioCard';

export default function PublicacionCard({ publicacion }) {
  const { comentarios, onComentar, onEditarComentario, onEliminarComentario, loading } = useComentarios(publicacion);
  const [mostrarComentarios, setMostrarComentarios] = useState(false);
  const [nuevoComentario, setNuevoComentario] = useState({ user: '', texto: '' });

  const handleAgregarComentario = async () => {
    if (nuevoComentario.texto.trim()) {
      try {
        const comentarioAEnviar = {
          ...nuevoComentario,
          user: nuevoComentario.user.trim() || "anonimo",
          fecha: new Date().toISOString(),
        };

        const nuevo = await onComentar(comentarioAEnviar);

        if (nuevo) {
          setNuevoComentario({ user: '', texto: '' });
        }
      } catch (error) {
        console.error('Error al agregar comentario:', error);
      }
    }
  };

  return (
    <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2, my: 2 }}>
      <Typography variant="h6" display="flex" alignItems="center" gap={1}>
        <TitleIcon fontSize="small" /> {publicacion.titulo}
      </Typography>
      <Typography variant="body1" display="flex" alignItems="center" gap={1}>
        <ArticleIcon fontSize="small" /> {publicacion.texto}
      </Typography>
      <Typography variant="caption" display="flex" alignItems="center" gap={1}>
        <AccountCircleIcon fontSize="small" /> {publicacion.autor || 'Autor desconocido'}
      </Typography>
      <Typography variant="caption" display="flex" alignItems="center" gap={1}>
        <CalendarTodayIcon fontSize="small" />
        {new Date(publicacion.fecha).toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </Typography>

      <Button onClick={() => setMostrarComentarios(!mostrarComentarios)} startIcon={<ForumIcon />}>
        {mostrarComentarios ? 'Ocultar comentarios' : 'Ver comentarios'}
      </Button>

      <Collapse in={mostrarComentarios}>
        <Box mt={2}>
          {comentarios.map((comentario) => (
            <ComentarioCard
              key={comentario._id}
              comentario={comentario}
              onEditarComentario={onEditarComentario}
              onEliminarComentario={onEliminarComentario}
              loading={loading}
            />
          ))}
          <Box display="flex" flexDirection="column" gap={1} mt={2}>
            <TextField
              label="Tu nombre"
              size="small"
              value={nuevoComentario.user}
              onChange={(e) => setNuevoComentario({ ...nuevoComentario, user: e.target.value })}
            />
            <TextField
              label="Comentario"
              size="small"
              multiline
              value={nuevoComentario.texto}
              onChange={(e) => setNuevoComentario({ ...nuevoComentario, texto: e.target.value })}
            />
            <Button variant="contained" onClick={handleAgregarComentario} disabled={loading}>
              {loading ? 'Comentando...' : 'Comentar'}
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
}
