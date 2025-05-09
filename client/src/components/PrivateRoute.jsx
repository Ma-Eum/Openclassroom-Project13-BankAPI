import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

/**
 * Composant de route privée sécurisé.
 * Si l’utilisateur n’est pas connecté → redirection automatique vers la page d’accueil
 */
const PrivateRoute = ({ children }) => {
  const token = useSelector((state) => state.user.token)
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)

  const localToken = localStorage.getItem('token')

  if (!isAuthenticated && !token && !localToken) {
    return <Navigate to="/" replace />
  }

  return children
}

export default PrivateRoute