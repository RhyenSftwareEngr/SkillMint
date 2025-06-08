import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ children }) {
    const { isAuthenticated, loading } = useAuth();
    if (loading) return null; // or a loading spinner
    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }
    return children;
}