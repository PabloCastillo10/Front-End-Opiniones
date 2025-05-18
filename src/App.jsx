import {Routes, Route, Link, Navigate} from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import PrivateRoute from './components/PrivateRoute'
import { useAuth } from './context/AuthContext'
import { useState } from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material';
import Layout from './components/Layout.jsx'
import { lightTheme, darkTheme } from './theme.js';
import { Outlet } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home.jsx'
import Cursos from './Pages/Curso.jsx'
import Publicaciones from './Pages/Publicacion.jsx'

function App() {
  const [dark, setDark] = useState(true);
  const toggle = () => setDark(!dark);

  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className={dark ? 'dark' : 'light'}>
        {dark && <div className="overlay"></div>}
        <div className="content">
          <Routes>
            <Route path='/' element={<Navigate to='/login' />} />
            <Route path="/" element={<Layout dark={dark} toggle={toggle} />}>
               <Route path="home" element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path='cursos' element ={<Cursos/>} />
              <Route path='publicaciones' element ={<Publicaciones/>} />
              
            </Route>
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;