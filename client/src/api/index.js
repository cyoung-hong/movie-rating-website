import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:3000/api' });
const tmdbUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_KEY}`;

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});


export const fetchNowPlaying = () => axios.get(tmdbUrl);

export const fetchRatings = () => API.get('/ratings');
export const getRecommendations = () => API.get('/recommendations');

export const signIn = (formData) => API.post('/user/signin', formData);

// TMDB
export const queryTMDB = (query) => API.get(`/tmdb/search${query}`);

//export const deletePost = (id) => API.delete(`/posts/${id}`);