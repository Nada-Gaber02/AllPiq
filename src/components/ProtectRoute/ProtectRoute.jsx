import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { userContext } from '../../Context/UserContext'

export default function ProtectRoute({ children }) {
    const { userLogin } = useContext(userContext);

    if (userLogin !== null) {
        return children;
    } else {
        return <Navigate to="/Login" />;
    }
}
