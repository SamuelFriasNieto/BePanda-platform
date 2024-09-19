import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Añadimos el estado de carga


  useEffect(() => {

    fetch('http://localhost:3001/check-session', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.loggedIn) {
          setUser(data.user);  // Aquí actualizamos el estado del usuario
        }else {
          setUser(null);  // Aquí actualizamos el estado a null si no hay usuario
        }
        setLoading(false); // Detenemos la carga
      })
      .catch(error => {
        console.error('Error fetching session:', error);
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>  
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
