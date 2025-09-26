import { Navigate } from "react-router-dom";
import { useAuthStore, useGuardedRoutesStore, useSnackbarStore } from "../store";

type ProtectedRouteProps = {
    children: React.ReactNode
}

export const ProtectedRouteController = ({ children }: ProtectedRouteProps) => {
    const {decoded, planDetails} = useAuthStore()
    const {showSnackbar}=useSnackbarStore()
    
    if (!decoded) {
        if(!planDetails){
        showSnackbar("Please subscribe a plan to start","warning")
        return <Navigate to="/plans" replace />;
        }
        return <Navigate to="/login" replace />;
    }

    return children;
};

type routeGuardeProps = {
    children: React.ReactNode,
    path: string
    redirectTo: string
}

export const RouteGuard = ({ children, path, redirectTo }: routeGuardeProps) => {
    const { routeName } = useGuardedRoutesStore()
    if (path === routeName) {
        return children
    } else {
        return <Navigate to={redirectTo} replace />;
    }
}



