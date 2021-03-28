import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:8082/api' });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const fetchRatings = () => API.get('/ratings');

export const getRecommendations = () => API.get('/recommendations');

export const signIn = (formData) => API.post('/user/signin', formData);

// TMDB
// Must correspond to controller endpoint
// router.get('/search/:query', searchMovie);
export const queryTMDBTitle = (query) => API.get(`/tmdb/search/${query}`);

//export const deletePost = (id) => API.delete(`/posts/${id}`);