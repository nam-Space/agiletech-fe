import { Input, Modal, Select, Space, Table, Tag } from "antd";
import { callGetPosts } from "config/api";
import queryString from "query-string";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "styles/post.scss";
import { UserContext } from "utils/UserContext";
import pencilImg from "../../images/profile/pencil.png";
import trashImg from "../../images/profile/trash.png";
import { callGetTags } from "config/api";
import { callDeletePostById } from "config/api";
import { refreshToken } from "utils/refreshToken";
import ModalTags from "./ModalTag";
import { callDeleteTagById } from "config/api";

const Tags = () => {
    const { user } = useContext(UserContext);
    const [formSearch, setFormSearch] = useState({
        title: "",
        description: "",
    });
    const [data, setData] = useState([]);
    const [meta, setMeta] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataInit, setDataInit] = useState({});

    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            render: (text, record, index, action) => {
                return <p>{index + 1}</p>;
            },
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            render: (text, record, index, action) => {
                return <p>{record.title}</p>;
            },
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            render: (text, record, index, action) => {
                return <p>{record.description}</p>;
            },
        },
        {
            title: "Action",
            key: "action",
            render: (_, record, index, action) => (
                <div className="action">
                    <img
                        onClick={() => {
                            setIsModalOpen(true);
                            setDataInit(record);
                        }}
                        className="pencil"
                        src={pencilImg}
                        width={29}
                        height={23}
                    />
                    <img
                        onClick={() => handleDeleteTag(record._id)}
                        className="trash"
                        src={trashImg}
                        width={37}
                        height={29}
                    />
                </div>
            ),
        },
    ];

    const handleGetTags = async (query) => {
        setIsLoading(true);
        try {
            const result = await callGetTags(query);
            setData(result.data);
            setMeta(result.meta);
        } catch (error) {
            toast.error(error.message, {
                position: "bottom-right",
            });
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (user?._id) {
            handleGetTags(`current=1&limit=10`);
        }
    }, [user?._id]);

    useEffect(() => {
        if (user?._id) {
            let temp = "";
            if (formSearch.title) {
                temp += `&title=/${formSearch.title}/i`;
            }
            if (formSearch.description) {
                temp += `&description=/${formSearch.description}/i`;
            }
            handleGetTags(`${temp}`);
        }
    }, [formSearch]);

    const handleChange = async (pagination, filters, sorter, extra) => {
        const clone = { ...pagination };
        if (clone.title) clone.title = `/${clone.title}/i`;
        if (clone.description) clone.description = `/${clone.description}/i`;

        const { pageSize } = clone;
        clone.limit = pageSize;

        delete clone.pageSize;
        delete clone.showSizeChanger;
        delete clone.total;

        let temp = queryString.stringify(clone);

        await handleGetTags(`${temp}`);
    };

    const handleDeleteTag = async (id) => {
        try {
            const result = await callDeleteTagById(id);
            if (!result.isError) {
                toast.success("Deleting tag successfully!", {
                    position: "bottom-right",
                });
                handleGetTags(`current=1&limit=10`);
            } else {
                toast.error("Fail to update tag!", {
                    position: "bottom-right",
                });
            }
        } catch (error) {
            toast.error(error.message, {
                position: "bottom-right",
            });
        }
    };

    return (
        <div className="post">
            <div className="extension">
                <button
                    onClick={() => {
                        setIsModalOpen(true);
                        setDataInit({});
                    }}
                    className="btn-add"
                >
                    Add new
                </button>
                <div className="input-wrapper">
                    <Input
                        placeholder="Title"
                        className="textbox"
                        value={formSearch.title}
                        onChange={(e) =>
                            setFormSearch({
                                ...formSearch,
                                title: e.target.value,
                            })
                        }
                    />
                    <Input
                        placeholder="Description"
                        className="textbox"
                        value={formSearch.description}
                        onChange={(e) =>
                            setFormSearch({
                                ...formSearch,
                                description: e.target.value,
                            })
                        }
                    />
                </div>
            </div>
            <div className="table">
                <Table
                    className="table-ele"
                    loading={isLoading}
                    pagination={{
                        current: meta?.current,
                        pageSize: meta?.pageSize,
                        showSizeChanger: true,
                        total: meta?.total,
                        showTotal: (total, range) => {
                            return (
                                <div>
                                    {" "}
                                    {range[0]}-{range[1]} in {total} rows
                                </div>
                            );
                        },
                    }}
                    onChange={handleChange}
                    columns={columns}
                    dataSource={data}
                />
            </div>
            <ModalTags
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                dataInit={dataInit}
                setDataInit={setDataInit}
                handleGetTags={handleGetTags}
            />
        </div>
    );
};

export default Tags;
