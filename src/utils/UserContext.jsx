import { callGetAccount } from "config/api";
import React, { createContext, useEffect, useState } from "react";
import { refreshToken } from "./refreshToken";
import { toast } from "react-toastify";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});

    const handleGetUser = async () => {
        try {
            const result = await callGetAccount();
            if (result.isError) {
                await refreshToken(handleGetUser);
            } else {
                setUser(result.data);
            }
        } catch (error) {
            toast.error(error.message, {
                position: "bottom-right",
            });
        }
    };

    useEffect(() => {
        handleGetUser();
    }, [localStorage.getItem("access_token")]);

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
