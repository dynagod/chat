import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            await axios.get('/api/v1/user/verify-token', { withCredentials: true })
            .then((response) => {
                setIsAuthenticated(true);
                console.log(response);
                
            })
            .catch((error) => {
                setIsAuthenticated(false);
                console.log(error);
                
            })
        };

        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // Show a loading state while checking authentication
    }

    if (!isAuthenticated) {
        return <Navigate to="/user/login" />;
    }

    return children;
};

export default ProtectedRoute