import React, { useState } from "react";
import logoImg from "../../images/logo.png";
import "styles/login.scss";
import { Link, useNavigate } from "react-router-dom";
import { callRegister } from "config/api";
import { toast } from "react-toastify";

const Register = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: "",
        fullName: "",
        password: "",
        re_password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await callRegister({
            ...form,
        });
        if (!result.isError) {
            toast.success("Đăng ký thành công!", {
                position: "bottom-right",
            });
            navigate("/login");
        } else {
            toast.error(result.message, {
                position: "bottom-right",
            });
        }
    };

    return (
        <div className="login">
            <div className="header-login">
                <img alt="logoImg" src={logoImg} />
            </div>
            <form className="login-wrapper" onSubmit={handleSubmit}>
                <p className="title">Sign Up</p>
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
                <div className="username-wrapper">
                    <label>FullName</label>
                    <div className="textbox">
                        <input
                            type="text"
                            value={form.fullName}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    fullName: e.target.value,
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
                <div className="password-wrapper">
                    <label>Re password</label>
                    <div className="textbox">
                        <input
                            type="password"
                            value={form.re_password}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    re_password: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
                <button type="submit" className="btn-login">
                    Sign Up
                </button>
                <p className="more">
                    Already have account? <Link to={"/login"}>Sign in</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
