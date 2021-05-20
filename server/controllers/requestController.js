import Request from "../models/Request.js";
import User from "../models/User.js";
import mongoose from "mongoose";

// axios.get(`/request/${filter}/${id}`)
export const getRequestTest = async (req, res) => {
  const { filter } = req.params.filter;
  const { id } = req.params.id;

  if(filter === '') {
    const requests = await Request.find(); 
  } 

  if(filter === 'self') {
    const requests = await Request.find({'requester.id': req.user._id});
  }

  const requests = await Request.find({ })
}

// Get all users recommendations
export const getRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get current user's recommendations
export const getMyRequests = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const myRequests = await Request.find({ "requester.id": req.user._id });
      res.status(200).json(myRequests);
    } else {
      res.status(401).json({ message: "Unauthorized, please login." });
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

// Get selected user's recommendations
export const getRequestsByUser = async (req, res) => {
  try {
    const userRequests = await Request.find({
      "requester.id": req.params.userId,
    });
    if (userRequests) {
      res.status(200).json({ userRequests });
    } else {
      res.status(404).json({ message: "This user has no recommendations." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get specific request by id
export const getRequestById = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (request) {
      res.status(200).json({ request });
    } else {
      res.status(404).json({ message: "Request not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createRequest = async (req, res) => {
  // Check is user is authenticated
  // Check if user made request already
  // --
  // Do i need to promisfy createRequest? On success, send the savedRequest._id to the recommender's recommendation array
  try {
    if (req.isAuthenticated()) {
      const request = req.body;

      // Check if there is a request that matches these two fields
      const foundRequest = await Request.findOne({
        "requester.id": req.user._id,
        "movie.tmdbID": request.movie.tmdbID,
      });

      if (foundRequest) {
        res.status(409).json({ error: "Request already exists." });
      } 

      else {
        const newRequest = new Request({
          requester: {
            id: req.user._id,
            username: req.user.username,
          },
          movie: request.movie,
          createdAt: new Date(),
        });

        console.log(newRequest);
        newRequest
          .save()
          .then((savedReq) => {
            res.status(201).json({ savedReq });
          })
          .catch((err) => {
            console.log(err);
          });
      }
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
export const updateRequest = async (req, res) => {
  try {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) res.status(404).json({ message: 'Invalid ID.'});

    const updReq = await Request.findByIdAndUpdate(req.params.id, { watchedOn: new Date() });

    if (updReq) { res.status(202).json({ message: 'Request updated successfully!'}); }
    else { res.status(404).json({ message: "Request not found." }); }

  } catch (err) {
    res.status(502).json({ err });
  }
};

export const deleteRequest = async (req, res) => {
  try {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) res.status(404).json({ message: 'Invalid ID.'});

    const delRequest = await Request.findByIdAndDelete(req.params.id);

    if (delRequest) { res.status(202).json({ message: "Deleted successfully." }); } 
    else { res.status(404).json({ message: "Request not found." }); }

  } catch (error) {
    res.status(500).json({ error });
  }
};
