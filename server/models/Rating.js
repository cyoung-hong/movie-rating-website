import mongoose from 'mongoose';

const ratingSchema = mongoose.Schema({
    rater: {id: String, username: String},
    rating: Number,
    comment: String,
    movie: {
        title: String,
        tmdbID: String,
        watchedOn: Date,
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

const Rating = mongoose.model(`Rating`, ratingSchema);

export default Rating;