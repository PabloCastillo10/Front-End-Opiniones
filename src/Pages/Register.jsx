
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Snackbar, Alert, InputAdornment, IconButton } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Register() {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();


  const handleTogglePassword = () => setPassword(!showPassword)

  const handleSubmit = (e) => {
    e.preventDefault();


    if(!email.includes('@')){
      setError('El correo no es valido');
      return;
    }
    if(password.length < 8){
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }
    const success = register(email, password);
    if (success) {
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      setError('El correo ya está registrado');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={4} sx={{ p: 4, width: 340 }}>
        <Typography variant="h5" mb={2} textAlign="center">
          Crear cuenta
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
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
            Registrarse
          </Button>
        </form>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
        </Typography>
      </Paper>

      {/* Snackbar de éxito */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          ¡Registro exitoso! Redirigiendo al login...
        </Alert>
      </Snackbar>
    </Box>
  );
}
