import { createBrowserRouter } from 'react-router-dom';
import Profile from '../pages/profile/Profile';

export default createBrowserRouter([
  {
    path: '/profile',
    element: <Profile />,
  },
]);
