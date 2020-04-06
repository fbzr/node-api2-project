import axios from 'axios';

const postsAxios = axios.create({
    baseURL: 'http://localhost:5000/api/posts'
});

export const getAllPosts = async () => {
    return await postsAxios.get('/');
}

export const addPost = async post => {
    return await postsAxios.post('/', post);
}

export const getPostById = async postId => {
    return await postsAxios.get(`/${postId}`);
}

export const deletePost = async postId => {
    return await postsAxios.delete(`/${postId}`);
}

export const updatePost = async post => {
    return await postsAxios.put(`/${post.id}`, post);
}

export const getPostComments = async postId => {
    return postsAxios.get(`/${postId}/comments`);
}

export const addPostComment = async (postId, comment) => {
    return postsAxios.post(`/${postId}/comments`, { text: comment });
}

export default {
    getAllPosts,
    addPost,
    getPostById,
    deletePost,
    updatePost,
    getPostComments,
    addPostComment
}