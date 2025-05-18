import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { usePublicaciones } from '../shared/hooks/usePublicaciones';
import PublicacionCard from '../components/PublicacionCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Typography, Grid, Button, Skeleton } from '@mui/material';
export default function Publicaciones() {
  const { publicaciones, handleGetPublicaciones } = usePublicaciones();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const cursoParam = searchParams.get('curso');

   useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await handleGetPublicaciones();
      setLoading(false);
    };

    fetchData();
  }, []);

  const publicacionesFiltradas = cursoParam
    ? publicaciones.filter((p) => p.curso?.cursoName === cursoParam)
    : publicaciones;
  
   const mostrarSkeleton = () =>
    Array.from({ length: 3 }).map((_, i) => (
      <Grid item xs={12} sm={6} md={4} key={i}>
        <Skeleton variant="rectangular" height={180} sx={{ borderRadius: 3, mb: 1 }} />
        <Skeleton width="80%" />
        <Skeleton width="60%" />
      </Grid>
    ));

  return (
    <Box sx={{ p: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">
          Publicaciones {cursoParam ? `de ${cursoParam}` : ''}
        </Typography>
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate('/cursos')}>
          Volver a Cursos
        </Button>
      </Box>

      <Grid container spacing={2}>
        {loading
          ? mostrarSkeleton()
          : publicacionesFiltradas.length > 0
          ? publicacionesFiltradas.map((publi, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <PublicacionCard publicacion={publi} />
              </Grid>
            ))
          : (
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ ml: 2 }}>
                No hay publicaciones para este curso.
              </Typography>
            </Grid>
          )}
      </Grid>
    </Box>
  );
}