import MovieRating from "../models/movieRating.js";

export const getRatings = async (req, res) => {
   try {
       console.log('In get Ratings -- server');
       const movieRatings = await MovieRating.find();
       console.log(movieRatings);
       res.status(200).json(movieRatings);
   } catch (error) {
       res.status(404).json({message: error.message});
   }
}

export const createRating = async (req, res) => {
    const rating = req.body;

    const newRating = new MovieRating(rating);

    try {
        await newRating.save();
        res.status(201).json(newRating);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}