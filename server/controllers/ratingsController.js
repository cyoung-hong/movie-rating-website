import Rating from "../models/Rating.js";

export const getRatings = async (req, res) => {
   try {
       console.log('In get Ratings -- server');
       const ratings = await Rating.find();
       console.log(ratings);
       res.status(200).json(ratings);
   } catch (error) {
       res.status(404).json({message: error.message});
   }
}

export const createRating = async (req, res) => {
    const rating = req.body;

    const newRating = new Rating(rating);

    try {
        await newRating.save();
        res.status(201).json(newRating);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}