import React from 'react';
import { useEffect, useState } from 'react';
import { useCursos } from '../shared/hooks/useCursos';
import CursoCard from '../components/CursoCard';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Button, TextField, Pagination } from '@mui/material';


export default function Cursos() {
  const { cursos, handleGetCursos } = useCursos();
  const navigate = useNavigate();


  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    handleGetCursos();
  }, []);

  const verPublicaciones = (curso) => {
    navigate(`/publicaciones?curso=${curso.cursoName}`);
  };

  const filteredCursos = cursos.filter((curso) => curso.cursoName.toLowerCase().includes(search.toLowerCase()));

  const totalPages = Math.ceil(filteredCursos.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const cursosToShow = filteredCursos.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Cursos Técnicos
      </Typography>

      <Button
        variant="outlined"
        color="secondary"
        sx={{mb:2}}
        onClick={() => navigate('/home')}
      >
       Volver al Home
      </Button>

      <TextField
        label="Buscar cursos"
        variant='outlined'
        fullWidth
        sx={{ mb: 3 }}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1); 
        }}
        
      />
        <Grid container spacing={2}>
        {cursosToShow.length > 0 ? (
          cursosToShow.map((curso, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CursoCard curso={curso} onVerPublicaciones={verPublicaciones} />
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ ml: 2 }}>
            No se encontraron cursos.
          </Typography>
        )}
      </Grid>
         {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
}