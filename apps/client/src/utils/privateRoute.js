import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthUser, isAuthAdmin } = useSelector((s) => s.users);

  if (location.pathname === '/history' && isAuthAdmin) {
    return <Navigate to="/product" />;
  }

  if (!isAuthUser || !isAuthAdmin) {
    return <Navigate to="/login" />;
  }

  return children;
};

export const PrivateRouteAdmin = ({ children }) => {
  const { isAuthAdmin } = useSelector((s) => s.users);

  if (!isAuthAdmin) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
