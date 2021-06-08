import Recommendation from "../models/Recommendation.js";
import mongoose from "mongoose";
import axios from 'axios';

// axios.get(`/request/${filter}/${id}`)
export const getRequestTest = async (req, res) => {
  const { filter } = req.params.filter;
  const { id } = req.params.id;

  if (filter === "") {
    const recs = await Recommendation.find();
  }

  if (filter === "self") {
    const requests = await Recommendation.find({
      "recommender.id": req.user._id,
    });
  }

  const requests = await Recommendation.find({});
};

// Get all users recommendations
export const getRecommendations = async (req, res) => {
  try {
    const recs = await Recommendation.find();
    res.status(200).json(recs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get current user's recommendations
// Might be redundant, can just re-use requestsByUser potentially
export const getMyRecs = async (req, res) => {
  console.log("Getting my recommendations...");
  try {
    if (req.isAuthenticated()) {
      const myRecs = await Recommendation.find({
        "recommender.userId": req.user._id,
      }).select("-recommender");
      
      res.status(200).json(myRecs);
    } else {
      res.status(401).json({ message: "Unauthorized, please login." });
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

// Get selected user's recommendations
export const getRecsByUser = async (req, res) => {
  try {
    const userRecs = await Recommendation.find({
      "recommender.userId": req.params.userId,
    });
    if (userRecs) {
      res.status(200).json({ userRecs });
    } else {
      res.status(404).json({ message: "This user has no recommendations." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get specific request by id
export const getRecsById = async (req, res) => {
  try {
    const recs = await Recommendation.findById(req.params.id);
    if (recs) {
      res.status(200).json({ recs });
    } else {
      res.status(404).json({ message: "Recommendations not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createRec = async (req, res) => {
  // Check is user is authenticated
  // Check if user made request already
  try {
    if (req.isAuthenticated()) {
      const rec = req.body;

      // Check if there is a request that matches these two fields
      const foundRec = await Recommendation.findOne({
        "recommender.userId": req.user._id,
        "movie.tmdbID": rec.movie.tmdbID,
      });

      if (foundRec) {
        return res.status(409).json({ error: "Request already exists." });
      }

      // TODO Improve performance here. 
      // Slows down adding of movie significantly
      const movie = await axios.get(
        `${process.env.TMDB_API}movie/${rec.movie.tmdbID}?api_key=${process.env.TMDB_KEY}&language=en-US`
      );  

      const newRec = new Recommendation({
        recommender: {
          userId: req.user._id,
          username: req.user.username,
        },
        movie: {
          ...rec.movie,
          runtime: movie.data.runtime,
        },
        createdAt: new Date(),
      });

      newRec
        .save()
        .then((savedRec) => {
          res.status(201).json({ savedRec });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      //Add redirect to login
      console.log("Redirecting...");
      res.status(401).json({ error: "Unauthorized, please sign in." });
    }
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
};

// Just add watchedOn date as todays date when called
export const updateRec = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      res.status(404).json({ message: "Invalid ID." });

    const updateRec = await Recommendation.findByIdAndUpdate(req.params.id, {
      watchedOn: new Date(),
    });

    if (updateRec) {
      res.status(202).json({ message: "Request updated successfully!" });
    } else {
      res.status(404).json({ message: "Request not found." });
    }
  } catch (err) {
    res.status(502).json({ err });
  }
};

export const deleteRec = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      res.status(404).json({ message: "Invalid ID." });

    const deleteRec = await Recommendation.findByIdAndDelete(req.params.id);

    if (deleteRec) {
      res.status(202).json({ message: "Deleted successfully." });
    } else {
      res.status(404).json({ message: "Request not found." });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
