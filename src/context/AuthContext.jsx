import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) setUser(savedUser);
  }, []);

  const login = (email, password) => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const found = storedUsers.find(u => u.email === email && u.password === password);
    if (found) {
      localStorage.setItem('user', JSON.stringify(found));
      setUser(found);
      return true;
    }
    return false;
  };

  const register = (email, password) => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const exists = storedUsers.find(u => u.email === email);
    if (exists) return false;
    const newUser = { email, password };
    storedUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(storedUsers));
    return true;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
