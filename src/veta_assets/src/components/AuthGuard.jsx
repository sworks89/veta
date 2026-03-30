import { Navigate } from 'react-router-dom';
import useVetaIdentity from '../contexts/VetaIdentityContext';

const AuthGuard = ({ children }) => {
  const { principal } = useVetaIdentity();

  if (!principal) {
    return <Navigate to='/' replace />;
  }

  return children;
};

export default AuthGuard;
