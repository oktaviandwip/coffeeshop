import { createBrowserRouter } from 'react-router-dom';
import Product from '../pages/product/Product.jsx';
import DetailProduct from '../pages/detailproduct/DetailProduct.jsx';

export default createBrowserRouter([
  {
    path: '/',
    element: <Product />,
  },
  {
    path: '/detail-product/:id',
    element: <DetailProduct />,
  },
]);
