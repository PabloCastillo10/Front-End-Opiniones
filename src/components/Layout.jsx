import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Container, Button, Slide } from '@mui/material';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useAuth } from '../context/AuthContext';


export default function Layout({ dark, toggle }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

  return (
    <>
      <Slide direction="down" in mountOnEnter unmountOnExit>
        <AppBar position="static" color="primary">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AssignmentTurnedInIcon /> Blog Cursos
            </Typography>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {user ? (
                <>
                  <Button color="inherit" startIcon={<LogoutIcon />} onClick={handleLogout}>
                    Cerrar sesión
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button color="inherit" startIcon={<LoginIcon />}>
                      Iniciar sesión
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button color="inherit" startIcon={<AppRegistrationIcon />}>
                      Registro
                    </Button>
                  </Link>
                </>
              )}
              <IconButton onClick={toggle} color="inherit">
                {dark ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </Slide>
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Outlet />
      </Container>
    </>
  );
}