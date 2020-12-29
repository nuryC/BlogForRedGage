import axios from 'axios';
const api = axios.create({
    baseURL: 'https://mockend.com/org/repo',
    headers: {
        'Content-Type': 'application/json',
    },
});
api.interceptors.response.use((response) => {
    if (response.status === 200) {
        console.log(response);
        return response.data.data;
    }
});
export function getPost() {
    return api.get('/posts', {
        params: {
            limit: 10,
        },
    });
}