import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Outlet, RouterProvider, useLocation } from 'react-router-dom'
import Header from './components/header.jsx'
import routes from './router/routes.jsx'
import { UserProvider } from '../UserContext.jsx'
import ProtectedRoute from './router/pr.jsx'

const Layout = () => {
  const location = useLocation();
  return (
    <div >
      {
        location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/' && location.pathname !== '/home' && location.pathname !== '/uservenue' && location.pathname !== '/user/dashboard' && location.pathname !== '/user/bookings' && location.pathname !== '/user/help' && location.pathname !== '/book' && location.pathname !== '/conformation' &&
        (
          <Header />
        )
      }
      <Outlet />
    </div>
  )
}
const router = createBrowserRouter([{
  path: '/',
  element: <Layout />,
  children: routes
}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
)
