import React, { useContext } from "react";
import "styles/header.scss";
import logoImg from "../images/logo.png";
import { UserContext } from "utils/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { callLogout } from "config/api";
import { toast } from "react-toastify";

const Header = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    const handleLogout = async () => {
        try {
            const result = await callLogout();
            localStorage.removeItem("access_token");
            setUser({});
            toast.success("Đăng xuất thành công!", {
                position: "bottom-right",
            });
        } catch (error) {
            toast.error(error.message, {
                position: "bottom-right",
            });
        }
    };

    return (
        <div className="header">
            <div className="header-wrapper">
                <img src={logoImg} />
                {user?._id ? (
                    <div className="user-granted">
                        <button
                            onClick={() => navigate("/profile")}
                            className="button"
                        >
                            Profile
                        </button>
                        <button onClick={handleLogout} className="button">
                            Logout
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => navigate("/login")}
                        className="button"
                    >
                        Sign In
                    </button>
                )}
            </div>
        </div>
    );
};

export default Header;
