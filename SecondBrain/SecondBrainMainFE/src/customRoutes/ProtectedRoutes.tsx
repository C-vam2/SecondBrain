import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoutes(){
    const authState =!!localStorage.getItem('token');
    return authState?<Outlet/>:<Navigate to={'/signin'}/>
}