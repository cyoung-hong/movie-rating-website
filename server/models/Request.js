import mongoose from 'mongoose';

const requestSchema = mongoose.Schema({
    recommender: {
        id: String,
        name: String
    },
    movie: {
        tmdbID: Number,
        title: String,
        year: Number,
        posterUrl: String, 
        runtime: Number, 
        genres: [{
            id: Number,
            name: String,
        }],
    },
    createdAt:{
        type: Date,
        default: new Date()
    },
    lastModified: {
        type: Date,
        default: new Date()
    },
})

const Request = mongoose.model(`Request`, requestSchema);

export default Request;