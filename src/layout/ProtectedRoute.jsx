import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { user, loading } = useContext(AuthContext);

    console.log("Current User:", user);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600"></div>
            </div>
        );
    }

    // User not logged in
    if (!user) {
        return <Navigate to="/auth/login" replace />;
    }

    // Check role only if roles are specified
    if (
        allowedRoles.length > 0 &&
        (!user.role || !allowedRoles.includes(user.role))
    ) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;