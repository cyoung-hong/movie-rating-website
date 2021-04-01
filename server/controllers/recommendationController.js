import MovieRecommendation from "../models/movieRecommendation.js";

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
  console.log(recommendation);
};