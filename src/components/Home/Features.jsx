import React from "react";
import "styles/features.scss";

import arrowRightImg from "../../images/home/feature/arrow-right.png";

import thumbItemImg1 from "../../images/home/feature/thumb-item-1.png";
import thumbItemImg2 from "../../images/home/feature/thumb-item-2.png";
import thumbItemImg3 from "../../images/home/feature/thumb-item-3.png";
import thumbItemImg4 from "../../images/home/feature/thumb-item-4.png";

import bgItem1 from "../../images/home/feature/bg-item-1.png";
import bgItem2 from "../../images/home/feature/bg-item-2.png";
import bgItem3 from "../../images/home/feature/bg-item-3.png";
import bgItem4 from "../../images/home/feature/bg-item-4.png";

const Features = () => {
    const items = [
        {
            title: "Search Data",
            desc: "Don’t worry if your data is very large, the Data Warehoue provides a search engine, which is useful for making it easier to find data effectively saving time.",
            learn: "Learn more",
            thumbImg: thumbItemImg1,
            bgImg: bgItem1,
        },
        {
            title: "24 Hours Access",
            desc: "Access is given 24 hours a full morning to night and meet again in the morning, giving you comfort when you need data when urgent.",
            learn: "Learn more",
            thumbImg: thumbItemImg2,
            bgImg: bgItem2,
        },
        {
            title: "Print Out",
            desc: "Print out service gives you convenience if someday you need print data, just edit it all and just print it.",
            learn: "Learn more",
            thumbImg: thumbItemImg3,
            bgImg: bgItem3,
        },
        {
            title: "Security Code",
            desc: "Data Security is one of our best facilities. Allows for your files to be safer. The file can be secured with a code or password that you created, so only you can open the file.",
            learn: "Learn more",
            thumbImg: thumbItemImg4,
            bgImg: bgItem4,
        },
    ];

    return (
        <div className="feature">
            <div className="feature-wrapper">
                <div className="feature-text">
                    <p className="feature-text-title">Features</p>
                    <p className="feature-text-desc">
                        Some of the features and advantages that we provide for
                        those of you who store data in this Data Warehouse.
                    </p>
                </div>
                <div className="feature-list">
                    {items.map((item, index) => (
                        <div key={index} className="feature-item">
                            <img
                                src={item.thumbImg}
                                alt="thumbImg"
                                className="feature-item-thumb"
                            />
                            <img
                                alt="bgImg"
                                src={item.bgImg}
                                className="feature-item-bg"
                            />
                            <div className="feature-item-text">
                                <div>
                                    <p className="feature-item-text-title">
                                        {item.title}
                                    </p>
                                    <p className="feature-item-text-desc">
                                        {item.desc}
                                    </p>
                                </div>
                                <div className="feature-item-text-learn">
                                    <p>{item.learn}</p>
                                    <img
                                        alt="arrowRightImg"
                                        src={arrowRightImg}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Features;
