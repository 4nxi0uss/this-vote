import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";


const PrivateRoutes = () => {

    const navigate = useNavigate()
    const isUserLoggedIn = localStorage.getItem('user');

    useEffect(() => {

        if (!isUserLoggedIn) {
            navigate('/')
        }
        // eslint-disable-next-line
    }, [])

    return (
        <Outlet />
    )
}

export default PrivateRoutes;