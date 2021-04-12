import mongoose from 'mongoose';

const requestSchema = mongoose.Schema({
    requester: {
        id: String,
        name: String
    },
    movie: {
        tmdbID: Number,
        title: String,
        year: String,
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