import Footer from "components/Footer";
import Header from "components/Header";
import DataStorage from "components/Home/DataStorage";
import Features from "components/Home/Features";
import Testimonials from "components/Home/Testimonials";
import React from "react";
import "styles/homepage.scss";

const HomePage = () => {
    return (
        <div className="homepage">
            <Header />
            <DataStorage />
            <Features />
            <Testimonials />
            <Footer />
        </div>
    );
};

export default HomePage;
