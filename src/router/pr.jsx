import { useNavigate, Navigate } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../UserContext.jsx';

const ProtectedRoute = ({ children, user }) => {
    const { userData } = useContext(UserContext);
    const navigate = useNavigate();

    return userData.role === user.role ? children : userData.role ==="Admin" ? <Navigate to="/dashboardhome" />: <Navigate to="/home" />;
};

export default ProtectedRoute;