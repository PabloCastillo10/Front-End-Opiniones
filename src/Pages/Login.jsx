import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  InputAdornment,
  Fade,
  Snackbar,
  Alert
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Lock from '@mui/icons-material/Lock';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (login(email, password)) {
      setSuccess(true);
     
    } else {
      setError('Credenciales inválidas');
    }
  };

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <Container maxWidth="sm">
      <Fade in={show} timeout={600}>
        <Box mt={5} p={4} sx={{ background: 'rgba(255,255,255,0.1)', borderRadius: 2, backdropFilter: 'blur(10px)' }}>
          <Typography variant="h4" gutterBottom>Iniciar Sesión</Typography>
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
                    <AccountCircle />
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
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />
            <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
              Entrar
            </Button>
          </form>
        </Box>
      </Fade>


      <Snackbar open={success} autoHideDuration={2000}>
        <Alert severity="success" sx={{ width: '100%' }}>
          ¡Inicio de sesión exitoso!
        </Alert>
      </Snackbar>
    </Container>
  );
}
