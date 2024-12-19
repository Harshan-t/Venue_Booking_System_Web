import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, roles, user }) => {
    if (!user || !roles.some(role => user.roles.includes(role))) {
        return <Navigate to="/unauthorized" />;
    }
    return children;
};

export default ProtectedRoute;
