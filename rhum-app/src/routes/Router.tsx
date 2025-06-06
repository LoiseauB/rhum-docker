import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import Bottles from '../pages/Bottles';
import BottleShow from '../pages/Bottles/show';
import Error from '../pages/Error';
import HomePage from '../pages/Home';
import Login from '../pages/Login';
import UserProfile from '../pages/User';
import Register from '../pages/Register';
import EditUserForm from '../pages/User/edit';
import AdminDashboard from '../pages/Admin';
import Legals from '../pages/Legals';
import Contact from '../pages/Contact';
import SitePlan from '../pages/SitePlan';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: '/bottles',
        element: <Bottles />,
        errorElement: <Error />,
      },
      {
        path: '/bottles/:id',
        element: <BottleShow />,
        errorElement: <Error />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/profile',
        element: <UserProfile />,
        errorElement: <Error />,
      },
      {
        path: '/profile/edit',
        element: <EditUserForm />,
        errorElement: <Error />,
      },
      {
        path: '/admin',
        element: <AdminDashboard/>,
        errorElement: <Error />
      },
      {
        path: '/legals',
        element: <Legals />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/plan',
        element: <SitePlan />
      },
    ],
  },
]);

export default router;
