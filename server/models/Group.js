import mongoose from "mongoose";

const groupSchema = mongoose.Schema({
  groupName: String,
  groupPhoto: String,
  members: [
    {
      _id: false,
      userId: mongoose.Schema.ObjectId,
      username: String,
      userPhoto: String,
      isAdmin: { type: Boolean, default: false },
    },
  ],
  groupRecommendations: [
    {
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
        genres: [{ id: Number, name: String }],
      },
    },
  ],
});

const Group = mongoose.model(`Group`, groupSchema);

export default Group;
