import Request from "../models/Request.js";
import User from "../models/user.js";

export const getRequest = async (req, res) => {
  try {
    console.log("In get Recommendation -- server");
    console.log(`Session ID: ${req.sessionID}`);
    if (req.user) {
      console.log(req.user);
    }
    const requests = await Request.find();

    res.status(200).json(requests);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createRequest = async (req, res) => {
  // Check is user is authenticated
  // Check if user made request already
  // -- 
  try {
    if (req.isAuthenticated()) {
      const foundRequest = await Request.find


      const recommendation = req.body;
      recommendation.recommender = req.user.name;
      recommendation.createdAt = new Date();


      res.status(201).json({ recommendation });
    }
    else {
      // Add redirect to login
      console.log("Redirecting...");
      res.status(401).json({ error: "Unauthorized, please sign in." });
    }
  } catch (err) {}
};
