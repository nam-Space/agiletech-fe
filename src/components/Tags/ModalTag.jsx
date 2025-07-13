import { Input, Modal } from "antd";
import { callCreateTag } from "config/api";
import { callUpdateTagById } from "config/api";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "styles/modalPost.scss";

const ModalTags = (props) => {
    const {
        isModalOpen,
        dataInit,
        setDataInit,
        setIsModalOpen,
        handleGetTags,
    } = props;
    const [form, setForm] = useState({
        title: "",
        description: "",
    });

    useEffect(() => {
        setForm({
            ...form,
            title: dataInit.title || "",
            description: dataInit.description || "",
        });
    }, [dataInit]);

    const handleSubmit = async () => {
        try {
            if (dataInit?._id) {
                const result = await callUpdateTagById(dataInit._id, {
                    ...form,
                });
                if (!result.isError) {
                    toast.success("Updating tag successfully!", {
                        position: "bottom-right",
                    });
                } else {
                    toast.error("Fail to update tag!", {
                        position: "bottom-right",
                    });
                }
            } else {
                const result = await callCreateTag({
                    ...form,
                });
                if (!result.isError) {
                    toast.success("Adding tag successfully!", {
                        position: "bottom-right",
                    });
                } else {
                    toast.error("Fail to add tag!", {
                        position: "bottom-right",
                    });
                }
            }
        } catch (error) {
            toast.error(error.message, {
                position: "bottom-right",
            });
        }

        setIsModalOpen(false);
        setDataInit({});
        await handleGetTags(`current=1&limit=10`);
    };

    return (
        <Modal
            title={`${dataInit?._id ? "Update" : "Create"} tag`}
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
            </div>
        </Modal>
    );
};

export default ModalTags;
