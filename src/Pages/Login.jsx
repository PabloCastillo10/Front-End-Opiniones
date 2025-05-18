
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Snackbar, Alert, InputAdornment, IconButton } from '@mui/material';
import {useAuth} from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();


  const handleTogglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {

   if (!email.includes('@')) {
      setError('Correo inválido');
      return;
    }

    if (password.length < 6) {
      setError('Contraseña mínima de 6 caracteres');
      return;
    }  
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      navigate('/home');
    } else {
      setError('Credenciales incorrectas');
    }
  };

  return (
   <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={4} sx={{ p: 4, width: 340 }}>
        <Typography variant="h5" mb={2} textAlign="center">
          Iniciar sesión
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            type="email"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              )
            }}
          />
          <TextField
            fullWidth
            label="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            type={showPassword ? 'text' : 'password'}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          {error && (
            <Typography color="error" variant="body2" mt={1}>
              {error}
            </Typography>
          )}
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
          </Typography>
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Ingresar
          </Button>
        </form>

       
        <Snackbar
          open={openSnackbar}
          autoHideDuration={1500}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
            ¡Bienvenido al Blog Técnico!
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
}
