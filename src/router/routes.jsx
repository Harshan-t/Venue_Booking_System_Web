import ProtectedRoute from './pr.jsx'

import App from '../App.jsx'
import Login from '../pages/login.jsx'
import Dashboardhome from '../pages/dashboardhome.jsx'
import Staffpage from '../pages/staffpage.jsx'
import Venue from '../pages/venue.jsx'
import Bookingconformation from '../pages/bookingcon.jsx'
import Addvenue1 from '../pages/addvenue1.jsx'
import BookingApproval from '../components/approval.jsx'
import Addvenue2 from '../pages/addvenue2.jsx'
import History from '../pages/history.jsx'
import VenueAnalyticsPage from "../pages/analyticsvenue"
import Queries from '../pages/query.jsx'

// user Pages
import Landingpage from '../pages/Landingpage.jsx'
import BookVenue from '../pages/BookVenue.jsx'
import Conformation from '../pages/BookConformation.jsx'
import UserDashboard from '../pages/UserDashboard.jsx'
import UserBookings from '../pages/UserBookings.jsx'
import UserQueries from '../pages/UserQueries.jsx'
import UserVenue from '../pages/UserVenue.jsx'
import { Outlet } from 'react-router-dom'
import CalendarPage from '../pages/availablevenue.jsx'

const routes = [
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/dashboardhome',
        element: <ProtectedRoute user={{ role: 'Admin' }} ><Dashboardhome /></ProtectedRoute>
    },
    {
        path: '/staffpage',
        element: <ProtectedRoute user={{ role: 'Admin' }}><Staffpage /></ProtectedRoute>
    },
    {
        path: '/venue',
        element: <ProtectedRoute user={{ role: 'Admin' }}><Venue /></ProtectedRoute>
    },
    {
        path: '/history',
        element: <ProtectedRoute user={{ role: 'Admin' }}><History /></ProtectedRoute>
    },
    {
        path: '/booking',
        element: <ProtectedRoute user={{ role: 'Admin' }}><Bookingconformation /></ProtectedRoute>
    },
    {
        path: '/addvenue1',
        element: <ProtectedRoute user={{ role: 'Admin' }}><Addvenue1 /></ProtectedRoute>
    },
    {
        path: '/addvenue2',
        element: <ProtectedRoute user={{ role: 'Admin' }}><Addvenue2 /></ProtectedRoute>
    },
    {
        path: '/approval',
        element: <ProtectedRoute user={{ role: 'Admin' }}><BookingApproval /></ProtectedRoute>
    },
    {
        path: '/query',
        element: <ProtectedRoute user={{ role: 'Admin' }}><Queries /></ProtectedRoute>
    },
    {
        path: '/analyticsvenue',
        element: <ProtectedRoute user={{ role: 'Admin' }}><VenueAnalyticsPage /></ProtectedRoute>
    },
    // user Pages
    {
        path: '/home',
        element: <ProtectedRoute user={{ role: 'user' }}><Landingpage /></ProtectedRoute>
    },
    {
        path: '/uservenue',
        element: <ProtectedRoute user={{ role: 'user' }}><UserVenue /></ProtectedRoute>
    },
    {
        path: '/user',
        element: <ProtectedRoute user={{ role: 'user' }}><Outlet /></ProtectedRoute>,
        children: [
            {
                path: 'dashboard',
                element: <UserDashboard />,
            },
            {
                path: 'bookings',
                element: <UserBookings />,
            },
            {
                path: 'help',
                element: <UserQueries />,
            },
        ]
    },
    {
        path: '/book',
        element: <ProtectedRoute user={{ role: 'user' }}><BookVenue /></ProtectedRoute>
    },
    {
        path: '/conformation',
        element: <ProtectedRoute user={{ role: 'user' }}><Conformation /></ProtectedRoute>
    },
    {
        path: '/availablevenue',
        element: <ProtectedRoute user={{ role: 'Admin' }}><CalendarPage /></ProtectedRoute>
    },
]

export default routes