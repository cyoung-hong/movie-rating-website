import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:8082/api' });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const fetchRatings = () => API.get('/ratings');

// Request endpoints
export const getRequest = () => API.get('/requests');
export const createRequest = (movieData) => API.post('/requests/create', movieData, {withCredentials: true});

// Group endpoints
export const createGroup = (formData) => API.post("/groups/create", formData, {withCredentials: true});

// Auth endpoints
export const signIn = (formData) => API.post('/auth/signin', formData, {withCredentials: true});
export const signUp = (formData) => API.post('/auth/signup', formData);
export const logOut = () => API.get('/auth/logout');
export const logIn = (formData) => API.post('/auth/login', formData, {withCredentials: true});

// TMDB
// Must correspond to controller endpoint
// router.get('/search/:query', searchMovie);
export const queryTMDBTitle = (query, page) => API.get(`/tmdb/search/${query}/${page}`);

//export const deletePost = (id) => API.delete(`/posts/${id}`);