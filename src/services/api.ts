import axios from 'axios';
import { generatePath } from "react-router";

const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export function getPosts() {
    return api.get('/posts', {
        params: {
            _limit:5,
            _sort:"createdAt",
            _order:"asc"
        },
    });
}

export function createPosts(data) {
    return api.post('/posts', data);
}

export function editPost(id,data){
    return api.put('/posts/'+id, data);
}

export function getDetailPost(id) {
    const url = generatePath("/posts/:id", {id: id});
    return api.get(url);
}

export function getComments(id) {
    return api.get('/comments', {
        params: {
            postId:id
        },
    });
}

export function createComment(data) {
    return api.post('/comments', data);
}