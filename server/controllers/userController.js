import User from "../models/User.js";
import GroupInquiry from "../models/GroupInquiry.js";

export const getUsers = async (req, res) => {
  try {
  const users = await User.find();
  } catch(error) {
    console.log(error);
    res.status(500).json({message: "Internal server error."});
  }
}

export const getUserById = async (req, res) => {

}

export const joinGroup = async (req, res) => {

}

export const leaveGroup = async (req, res) => {

}

export const getGroupInvites = async (req, res) => {
  if (req.isAuthenticated()) {
    const invites = await GroupInquiry.find({
      origin: "group",
      "user.id": req.user._id,
    });
  }
};
