import {Routes, Route, Link} from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import PrivateRoute from './components/PrivateRoute'
import { useAuth } from './context/AuthContext'
import { useState } from 'react'
import { ThemeProvider, CssBaseline, IconButton, Container, AppBar, Toolbar, Typography } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { lightTheme, darkTheme } from './theme.js';
import { Outlet } from 'react-router-dom'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import './App.css'
import Home from './Pages/Home.jsx'

function App() {
  const {user, logout} = useAuth();
  const [dark, setDark] = useState(true)
  const toggle = () => setDark(!dark)


  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className={dark ? 'dark' : 'light'}>
        {dark && <div className="overlay"></div>}
  
        <div className="content">
          <AppBar position="static" color="primary">
            <Toolbar>
             <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                <AssignmentTurnedInIcon />
               Blog Cursos
              </Typography>
              {user ? (
                <>
                </>
              ) : (
                <>
                  <Link className="btn btn-light me-2" to="/login">Login</Link>
                  <Link className="btn btn-light me-2" to="/register">Registro</Link>
                </>
              )}
              <IconButton onClick={toggle} color="inherit">
                {dark ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Toolbar>
          </AppBar>
  
          <Container maxWidth="lg" sx={{ mt: 2 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
            <Outlet />
          </Container>
        </div>
      </div>
    </ThemeProvider>
  );
}


export default App;