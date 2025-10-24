import { Navigate } from "react-router-dom";
import { useAuthStore, useGuardedRoutesStore } from "../store";

type ProtectedRouteProps = {
    children: React.ReactNode
}

export const ProtectedRouteController = ({ children }: ProtectedRouteProps) => {
    const { decoded, planDetails } = useAuthStore()

    console.log(planDetails?.data,"****************")
    
    if (!decoded) {
        return <Navigate to="/login" replace />;
    }
    if (!planDetails?.data) {
        return <Navigate to="/plans" replace />;
    }

    return (
        <>
            {children}
        </>
    )
};

// type routeGuardeProps = {
//     children: React.ReactNode,
//     path: string
//     redirectTo: string
// }

// export const RouteGuard = ({ children, path, redirectTo }: routeGuardeProps) => {
//     const { routeName } = useGuardedRoutesStore()
//     if (path === routeName) {
//         return (
//             { children }
//         )
//     } else {
//         return <Navigate to={redirectTo} replace />;
//     }
// }



