import mongoose from 'mongoose';

const recommendationSchema = mongoose.Schema({
    recommender: String,
    movie: {
        tmdbID: Number,
        title: String,
        year: Number,
        posterUrl: String, 
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

const MovieRecommendation = mongoose.model(`MovieRecommendation`, recommendationSchema);

export default MovieRecommendation;