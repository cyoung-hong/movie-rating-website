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

const Rating = mongoose.model(`Rating`, ratingSchema);

export default Rating;