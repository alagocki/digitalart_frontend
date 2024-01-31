import {useLocation} from "react-router-dom";

export const getCurrentPath = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const location = useLocation()
    return location.pathname
}