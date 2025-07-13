import React, { useState } from "react";
import logoImg from "../../images/logo.png";
import "styles/login.scss";
import { Link, useNavigate } from "react-router-dom";
import { callLogin } from "config/api";
import { toast } from "react-toastify";

const Login = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await callLogin(form);
        if (!result.isError) {
            toast.success("Đăng nhập thành công!", {
                position: "bottom-right",
            });
            localStorage.setItem("access_token", result.accessToken);
            window.location.href = "/";
        } else {
            toast.error(result.message, {
                position: "bottom-right",
            });
        }
    };

    return (
        <div className="login">
            <div className="header-login">
                <Link to={"/"}>
                    <img src={logoImg} />
                </Link>
            </div>
            <form className="login-wrapper" onSubmit={handleSubmit}>
                <p className="title">Sign In</p>
                <div className="username-wrapper">
                    <label>Username</label>
                    <div className="textbox">
                        <input
                            type="text"
                            value={form.username}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    username: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
                <div className="password-wrapper">
                    <label>Password</label>
                    <div className="textbox">
                        <input
                            type="password"
                            value={form.password}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    password: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
                <button type="submit" className="btn-login">
                    Sign In
                </button>
                <p className="more">
                    Don't have account? <Link to={"/register"}>Sign up</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
