import { Navigate, useLocation } from "react-router-dom";
import useFirebase from "../../../hooks/useFirebase";

function PrivateRouter({ children, ...rest }) {
    const { user, isLoading } = useFirebase();
    let location = useLocation();

    if (isLoading) {
        return <h2>Loading</h2>
    }


    if (!user?.email) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}


export default PrivateRouter;