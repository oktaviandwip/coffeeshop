import { createBrowserRouter } from 'react-router-dom';
import Product from '../pages/product/Product.jsx';
import DetailProduct from '../pages/detailproduct/DetailProduct.jsx';
import EditProduct from '../pages/admin/EditProduct.jsx';

import ForgotPassword from '../pages/auth/ForgotPassword';
import Login from '../pages/auth/Login';
import SignUp from '../pages/auth/SignUp';
import Home from '../pages/home/Home';
import Profile from '../pages/profile/Profile';

export default createBrowserRouter([
  {
    path: '/',
    element: <Product />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/detail-product/:id',
    element: <DetailProduct />,
  },
  {
    path: '/edit-product/:id',
    element: <EditProduct />,
  },
]);
