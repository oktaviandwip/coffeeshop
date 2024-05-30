import { createBrowserRouter } from 'react-router-dom';

import History from '../components/History';
import AddProduct from '../pages/admin/AddProduct.jsx';
import EditProduct from '../pages/admin/EditProduct.jsx';
import ForgotPassword from '../pages/auth/ForgotPassword';
import Login from '../pages/auth/Login';
import SignUp from '../pages/auth/SignUp';
import Cart from '../pages/cart/Cart.jsx';
import Dashboard from '../pages/dashboard/Dashboard.jsx';
import DetailProduct from '../pages/detailproduct/DetailProduct.jsx';
import Home from '../pages/home/Home';
import Product from '../pages/product/Product.jsx';
import Profile from '../pages/profile/Profile';
import PrivateRoute, { PrivateRouteAdmin } from './privateRoute.js';
import Product from '../pages/product/Product.jsx';
import DetailProduct from '../pages/detailproduct/DetailProduct.jsx';

export default createBrowserRouter([
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
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },
  {
    path: '/product',
    element: <Product />,
  },
  {
    path: '/product/:id',
    element: (
      <PrivateRoute>
        <DetailProduct />
      </PrivateRoute>
    ),
  },
  {
    path: '/your-cart',
    element: (
      <PrivateRoute>
        <Cart />
      </PrivateRoute>
    ),
  },
  {
    path: '/history',
    element: (
      <PrivateRoute>
        <History />
      </PrivateRoute>
    ),
  },
  {
    path: '/product/:id/edit',
    element: (
      <PrivateRouteAdmin>
        <EditProduct />
      </PrivateRouteAdmin>
    ),
  },
  {
    path: '/product/add',
    element: (
      <PrivateRouteAdmin>
        <AddProduct />
      </PrivateRouteAdmin>
    ),
  },
  {
    path: '/cart',
    element: <Cart />,
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRouteAdmin>
        {' '}
        <Dashboard />
      </PrivateRouteAdmin>
    ),
  },
]);
