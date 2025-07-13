import axios from "config/axios.customize";

// user
export const callLogin = ({ username, password }) => {
    return axios.post(`/auth/login`, {
        username,
        password,
    });
};

export const callRegister = (data) => {
    return axios.post(`/auth/register`, {
        ...data
    });
};

export const callRefreshToken = () => {
    return axios.post(`/auth/refreshToken`);
};

export const callGetAccount = () => {
    return axios.post(`/auth/account`);
}

export const callLogout = () => {
    return axios.post(`/auth/logout`);
};

/* Post */
export const callGetPosts = (query) => {
    return axios.get(`/posts?${query}`)
}

export const callGetPostById = (id) => {
    return axios.get(`/posts/${id}`)
}

export const callCreatePost = (data) => {
    return axios.post(`/posts`, { ...data })
}

export const callUpdatePostById = (id, data) => {
    return axios.patch(`/posts/${id}`, { ...data })
}

export const callDeletePostById = (id) => {
    return axios.delete(`/posts/${id}`)
}

/* Tag */
export const callGetTags = (query) => {
    return axios.get(`/tags?${query}`)
}

export const callGetTagById = (id) => {
    return axios.get(`/tags/${id}`)
}

export const callCreateTag = (data) => {
    return axios.post(`/tags`, { ...data })
}

export const callUpdateTagById = (id, data) => {
    return axios.patch(`/tags/${id}`, { ...data })
}

export const callDeleteTagById = (id) => {
    return axios.delete(`/tags/${id}`)
}