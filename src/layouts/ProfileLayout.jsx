import Sidebar from "components/Profile/Sidebar";
import React from "react";
import "styles/profile.scss";

const ProfileLayout = ({ children }) => {
    return (
        <div className="profile">
            <div className="profile-wrapper">
                <Sidebar />
                {children}
            </div>
        </div>
    );
};

export default ProfileLayout;
