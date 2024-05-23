import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { isAuthUser } = useSelector((s) => s.users);
  if (!isAuthUser) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
