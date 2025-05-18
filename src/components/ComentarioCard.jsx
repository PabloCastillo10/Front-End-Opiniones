import { useState } from 'react';
import { Box, Typography, IconButton, TextField, Snackbar, Alert } from '@mui/material';
import { Edit, Delete, Save, Cancel, Person, ChatBubbleOutline, Event } from '@mui/icons-material';

export const ComentarioCard = ({ comentario, onEditarComentario, onEliminarComentario }) => {
  const [modoEdicion, setModoEdicion] = useState(false);
  const [texto, setTexto] = useState(comentario.texto);
  const [openEditSnackbar, setOpenEditSnackbar] = useState(false);
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false);

  const handleGuardar = () => {
    onEditarComentario(comentario._id, texto);
    setModoEdicion(false);
    setOpenEditSnackbar(true);
  };

  const handleEliminar = () => {
    onEliminarComentario(comentario._id);
    setOpenDeleteSnackbar(true);
  };
 return (
    <Box
      sx={{
        border: '1px solid #ccc',
        borderRadius: 2,
        p: 2,
        my: 1,
        position: 'relative',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Person fontSize="small" sx={{ mr: 1 }} color="primary" />
        <Typography variant="subtitle2" color="primary">
          {comentario.user}
        </Typography>
      </Box>

      {modoEdicion ? (
        <TextField
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          fullWidth
          multiline
          rows={2}
          sx={{ my: 1 }}
        />
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <ChatBubbleOutline fontSize="small" sx={{ mr: 1 }} color="action" />
          <Typography variant="body1">{comentario.texto}</Typography>
        </Box>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Event fontSize="small" sx={{ mr: 1 }} color="disabled" />
        <Typography variant="caption" color="text.secondary">
          {new Date(comentario.fecha).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
        {modoEdicion ? (
          <>
            <IconButton color="primary" onClick={handleGuardar}>
              <Save />
            </IconButton>
            <IconButton color="secondary" onClick={() => setModoEdicion(false)}>
              <Cancel />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton color="primary" onClick={() => setModoEdicion(true)}>
              <Edit />
            </IconButton>
            <IconButton color="error" onClick={handleEliminar}>
              <Delete />
            </IconButton>
          </>
        )}
      </Box>

 
      <Snackbar
        open={openEditSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenEditSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenEditSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Comentario actualizado con éxito
        </Alert>
      </Snackbar>


      <Snackbar
        open={openDeleteSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenDeleteSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenDeleteSnackbar(false)} severity="info" sx={{ width: '100%' }}>
          Comentario eliminado
        </Alert>
      </Snackbar>
    </Box>
  );
};