import mongoose from "mongoose";

const recommendationSchema = mongoose.Schema({
  recommender: {
    _id: mongoose.Schema.ObjectId,
    username: String,
  },
  movie: {
    tmdbID: Number,
    title: String,
    year: String,
    posterUrl: String,
    runtime: Number,
    genres: [
      {
        id: Number,
        name: String,
      },
    ],
  },
  priority: Number,
  groups: [{ _id: mongoose.Schema.ObjectId }],
  createdAt: {
    type: Date,
    default: new Date(),
  },
  watchedOn: {
    type: Date,
  },
});

const Recommendation = mongoose.model(`Recommendation`, recommendationSchema);

export default Recommendation;
