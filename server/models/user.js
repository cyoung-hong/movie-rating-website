import mongoose from "mongoose";
import Group from "./Group.js";

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  firstName: String,
  lastName: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  picturePath: { type: String, default: "../public/images/default.png" },
  activeGroup: {
    _id: { type: mongoose.Schema.ObjectId, default: null },
    groupName: { type: String },
    groupPhoto: { type: String },
    members: [
      {
        _id: mongoose.Schema.ObjectId,
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
  },
});

const User = mongoose.model(`User`, userSchema);

export default User;
