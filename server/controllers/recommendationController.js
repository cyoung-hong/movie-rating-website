import MovieRecommendation from "../models/movieRecommendation.js";
import User from "../models/user.js";

export const getRecommendations = async (req, res) => {
  try {
    console.log("In get Recommendation -- server");
    const movieRecommendations = await MovieRecommendation.find();

    res.status(200).json(movieRecommendations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const createRecommendation = async (req, res) => {
  const recommendation = req.body;
  const user = await User.findById(req?.userId);

  recommendation.recommender = {
    id: user._id,
    name: user.name
  };

  recommendation.createdAt = new Date();

  // Add to recommendation collection
  // User needs a getAllRecommendations by date ting

  console.log("User" + user);

  console.log("Recommendation================");
  console.log(recommendation);
};