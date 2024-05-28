import { createBrowserRouter } from 'react-router-dom';

import History from '../components/History';

import EditProduct from '../pages/admin/EditProduct.jsx';
import DetailProduct from '../pages/detailproduct/DetailProduct.jsx';
import Product from '../pages/product/Product.jsx';
import AddProduct from '../pages/admin/AddProduct.jsx';
import ForgotPassword from '../pages/auth/ForgotPassword';
import Login from '../pages/auth/Login';
import SignUp from '../pages/auth/SignUp';
import Home from '../pages/home/Home';
import Profile from '../pages/profile/Profile';
import PrivateRoute, { PrivateRouteAdmin } from './privateRoute.js';

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
    path: '/history',
    element: <History />,
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
    element: <AddProduct />,
  },
]);
