import React, { useContext } from "react";
import logoImg from "../../images/logo.png";
import "styles/sidebar.scss";
import { Link, useNavigate } from "react-router-dom";
import { callLogout } from "config/api";
import { UserContext } from "utils/UserContext";
import { toast } from "react-toastify";

const Sidebar = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleLogout = async () => {
        try {
            await callLogout();
            localStorage.removeItem("access_token");
            setUser({});
            toast.success("Đăng xuất thành công!", {
                position: "bottom-right",
            });
            navigate("/login");
        } catch (error) {
            toast.error(error.message, {
                position: "bottom-right",
            });
        }
    };

    return (
        <div className="sidebar">
            <div className="logo">
                <Link to={"/"}>
                    <img alt="logoImg" src={logoImg} className="logo-img" />
                </Link>
            </div>
            <div className="text">
                <div>
                    <Link to={"/profile"} className="text-item">
                        Posts
                    </Link>
                </div>
                <div>
                    <Link to={"/tag"} className="text-item">
                        Tags
                    </Link>
                </div>
                <div>
                    <p onClick={handleLogout} className="text-item">
                        Logout
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
