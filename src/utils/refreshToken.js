import { callRefreshToken } from "config/api";
import { toast } from "react-toastify";

export const refreshToken = async (callback) => {
    try {
        const result = await callRefreshToken()

        if (result.isError) {
            if (window.location.pathname !== '/' && window.location.pathname !== '/login' && window.location.pathname !== "/register") {
                console.log(window.location)
                // window.location.href = '/login'
                toast.error(result.message, {
                    position: "bottom-right",
                });
            }

        } else {
            localStorage.setItem("access_token", result.accessToken);
            await callback();
        }
    } catch (error) {
        toast.error(error.message, {
            position: "bottom-right",
        });
    }
};