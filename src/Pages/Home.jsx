import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion';

export default function Home() {
  const navigate = useNavigate();

 return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url(https://images.unsplash.com/photo-1581093588401-6c8c1f1b3d33)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          zIndex: 1,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ zIndex: 2 }}
      >
        <Box sx={{ color: 'white', maxWidth: 600, p: 4 }}>
          <BuildCircleIcon sx={{ fontSize: 60, mb: 2, color: '#90caf9' }} />
          <Typography variant="h3" gutterBottom>
            Bienvenido a tu Blog Técnico
          </Typography>
          <Typography variant="h6" gutterBottom>
            Explora las actividades y publicaciones clasificadas por Taller, Práctica y Tecnología.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate('/cursos')}
            sx={{ mt: 3 }}
          >
            Ver Cursos
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
}
