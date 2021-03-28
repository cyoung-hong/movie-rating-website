import mongoose from 'mongoose';

const ratingSchema = mongoose.Schema({
    rater: String,
    rating: Number,
    comment: String,
    movie: {
        title: String,
        id: String,
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    lastModified: {
        type: Date,
        default: new Date()
    },
})

const MovieRating = mongoose.model(`MovieRating`, ratingSchema);

export default MovieRating;