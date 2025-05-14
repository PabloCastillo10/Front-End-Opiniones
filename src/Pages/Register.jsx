import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TextField, Button, Container, Typography, Box, InputAdornment, Fade, Snackbar, Alert } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (register(email, password)) {
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setError('El usuario ya existe');
    }
  };

  useEffect(() => {
    setShow(true);
  }, []);

 return (
    <Container maxWidth="sm">
      <Fade in={show} timeout={600}>
        <Box mt={5} p={4} sx={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: 3,
          boxShadow: 3,
          backdropFilter: 'blur(10px)',
          transition: 'all 0.5s ease-in-out'
        }}>
          <Typography variant="h4" gutterBottom>Registro</Typography>
          {error && <Typography color="error">{error}</Typography>}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Correo"
              margin="normal"
              value={email}
              onChange={e => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Contraseña"
              type="password"
              margin="normal"
              value={password}
              onChange={e => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
              Registrar
            </Button>
          </form>
        </Box>
      </Fade>
      <Snackbar open={success} autoHideDuration={2000}>
        <Alert severity="success" sx={{ width: '100%' }}>
          ¡Registro exitoso!
        </Alert>
      </Snackbar>
    </Container>
  );
}
