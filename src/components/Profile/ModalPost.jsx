import { Input, Modal, Select } from "antd";
import { callCreatePost } from "config/api";
import { callUpdatePostById } from "config/api";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "styles/modalPost.scss";
import { refreshToken } from "utils/refreshToken";
import { UserContext } from "utils/UserContext";

const ModalPost = (props) => {
    const {
        isModalOpen,
        dataInit,
        setDataInit,
        setIsModalOpen,
        tags,
        handleGetPosts,
    } = props;
    const { user } = useContext(UserContext);
    const [form, setForm] = useState({
        title: "",
        description: "",
        tags: [],
    });

    useEffect(() => {
        setForm({
            ...form,
            title: dataInit.title || "",
            description: dataInit.description || "",
            tags:
                dataInit.tags?.length > 0
                    ? dataInit.tags.map((tag) => tag._id)
                    : [],
        });
    }, [dataInit]);

    const handleSubmit = async () => {
        try {
            if (dataInit?._id) {
                const result = await callUpdatePostById(dataInit._id, {
                    ...form,
                    tags: form.tags.map((tag) => tag),
                    user: user._id,
                });
                if (!result.isError) {
                    toast.success("Updating post successfully!", {
                        position: "bottom-right",
                    });
                } else {
                    await refreshToken(handleSubmit);
                    // toast.error("Fail to update post!", {
                    //     position: "bottom-right",
                    // });
                }
            } else {
                const result = await callCreatePost({
                    ...form,
                    tags: form.tags.map((tag) => tag),
                    user: user._id,
                });
                if (!result.isError) {
                    toast.success("Adding post successfully!", {
                        position: "bottom-right",
                    });
                } else {
                    await refreshToken(handleSubmit);
                    // toast.error("Fail to add post!", {
                    //     position: "bottom-right",
                    // });
                }
            }
        } catch (error) {
            toast.error(error.message, {
                position: "bottom-right",
            });
        }

        setIsModalOpen(false);
        setDataInit({});
        await handleGetPosts(`populate=tags&user=${user._id}`);
    };

    return (
        <Modal
            title={`${dataInit?._id ? "Update" : "Create"} post`}
            open={isModalOpen}
            onOk={handleSubmit}
            onCancel={() => {
                setIsModalOpen(false);
                setDataInit({});
            }}
            className="modal"
        >
            <div className="modal-wrapper">
                <Input
                    placeholder="Title"
                    className="textbox"
                    value={form.title}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            title: e.target.value,
                        })
                    }
                />
                <Input
                    placeholder="Description"
                    className="textbox"
                    value={form.description}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            description: e.target.value,
                        })
                    }
                />
                <Select
                    mode="multiple"
                    placeholder="Tags"
                    className="select"
                    value={form.tags}
                    onChange={(val) =>
                        setForm({
                            ...form,
                            tags: val,
                        })
                    }
                    options={tags.map((tag) => {
                        return {
                            label: tag.title,
                            value: tag._id,
                        };
                    })}
                    optionRender={(option) => <span>{option.data.label}</span>}
                />
            </div>
        </Modal>
    );
};

export default ModalPost;
