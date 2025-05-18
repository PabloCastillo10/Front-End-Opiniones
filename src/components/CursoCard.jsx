import React from 'react';
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { motion } from 'framer-motion';

export default function CursoCard({ curso, onVerPublicaciones }) {
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ scale: 1.03 }}
    >
      <Card
        sx={{
          minWidth: 275,
          borderRadius: 3,
          boxShadow: 3,
          transition: '0.3s',
          '&:hover': {
            boxShadow: 6,
          },
        }}
      >
        <CardContent>
          <SchoolIcon color="primary" fontSize="large" />
          <Typography variant="h6" gutterBottom>
            {curso.cursoName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {curso.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => onVerPublicaciones(curso)}>
            Ver publicaciones
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
}
