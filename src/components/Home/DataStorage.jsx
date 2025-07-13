import React from "react";
import "styles/dataStorage.scss";
import dataStorageImg from "../../images/home/data-storage/data-storage.png";

const DataStorage = () => {
    return (
        <div className="data-storage">
            <div className="data-storage-wrapper">
                <div className="text-wrapper">
                    <p className="title">Save your data storage here.</p>
                    <p className="desc">
                        Data Warehouse is a data storage area that has been
                        tested for security, so you can store your data here
                        safely but not be afraid of being stolen by others.
                    </p>
                    <button className="btn">Learn more</button>
                </div>
                <img alt="dataStorageImg" src={dataStorageImg} />
            </div>
        </div>
    );
};

export default DataStorage;
