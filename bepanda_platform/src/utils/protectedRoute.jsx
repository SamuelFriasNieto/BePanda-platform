import { useAuth } from './authProvider';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth(); // Asegúrate de que también estás obteniendo 'loading'

  if (loading) {
    return <div></div>; // Muestra un indicador de carga mientras el estado del usuario se verifica
  }

  if (!user) {
    return <Navigate to="/login" replace />; // Si no hay usuario, redirige al login
  }

  return children; // Si el usuario está autenticado, muestra el contenido protegido
};

export default ProtectedRoute;
