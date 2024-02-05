import { useRoutes } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import Error from './Error';

const Routes = () => useRoutes([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/error',
    element: <Error />,
  }
]);

export default Routes;
