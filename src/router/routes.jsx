import App from '../App.jsx'
import Login from '../pages/login.jsx'
import Register from '../pages/register.jsx'
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
import User from '../pages/user.jsx'

// user Pages
import Landingpage from '../pages/Landingpage.jsx'
import BookVenue from '../pages/BookVenue.jsx'
import Conformation from '../pages/BookConformation.jsx'
import UserDashboard from '../pages/UserDashboard.jsx'
import UserBookings from '../pages/UserBookings.jsx'
import UserQueries from '../pages/UserQueries.jsx'
import UserVenue from '../pages/UserVenue.jsx'

const routes = [
    {
        path: '/register',
        element: <Register />
    },

    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/dashboardhome',
        element: <Dashboardhome />
    },
    {
        path: '/staffpage',
        element: <Staffpage />
    },
    {
        path: '/venue',
        element: <Venue />
    },
    {
        path: '/history',
        element: <History />
    },
    {
        path: '/booking',
        element: <Bookingconformation />
    },
    {
        path: '/addvenue1',
        element: <Addvenue1 />
    },
    {
        path: '/addvenue2',
        element: <Addvenue2 />
    },
    {
        path: '/approval',
        element: <BookingApproval />
    },
    {
        path: '/query',
        element: <Queries />
    },
    {
        path: '/userprofile',
        element: <User />
    },
    {
        path: '/analyticsvenue',
        element: <VenueAnalyticsPage />
    },
    // user Pages
    {
        path: '/home',
        element: <Landingpage />
    },
    {
        path: '/uservenue',
        element: <UserVenue />
    },
    {
        path: '/user',
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
        element: <BookVenue />
    },
    {
        path: '/conformation',
        element: <Conformation />
    },
]

export default routes