import Request from "../models/Request.js";
import User from "../models/user.js";

export const getRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getRequestById = async (req, res) => {
  try {
    const request = await Request.findById(req.body.request._id);
    if (request) {
      res.status(200).json({ request });
    } else {
      res.status(404).json({ msg: "Request not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRequestByUser = (userID = async (req, res) => {});

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
        res.status(409).json({ msg: "Request already exists." });
      } else {
        const newRequest = new Request({
          requester: {
            id: req.user._id,
            name: req.user.name,
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
