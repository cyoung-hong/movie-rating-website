import mongoose from "mongoose";
import Group from "../models/Group.js";
import GroupInquiry from "../models/GroupInquiry.js";
import User from "../models/User.js";
import Recommendation from "../models/Recommendation.js";

const checkAdmin = (user, group) => {
  const member = group.members.find((m) => m.username === user.username);
  return member?.isAdmin;
};

// Get groups
export const getGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    if (groups) {
      res.status(200).json({ groups });
    } else {
      res.status(404).json({ message: "No groups found" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Get group by group id
export const getGroupById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      res.status(404).json({ message: "Invalid ID." });

    const group = await Group.findById(req.params.id);
    if (group) {
      res.status(200).json({ group });
    } else {
      res.status(404).json({ error: "Group not found." });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Create group
export const createGroup = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const data = req.body;
      const { user } = req;
      const members = [];
      const groupRecommendations = [];

      const existingGroup = await Group.findOne({ groupName: data.groupName });
      const memberRecommendation = await Recommendation.findOne({
        "recommender._id": req.user._id,
      });

      const foundingMember = {
        _id: user._id,
        username: user.username,
        picturePath: user.picturePath,
        isAdmin: true,
      };

      members.push(foundingMember);
      groupRecommendations.push(memberRecommendation);

      //Check if a group exists with the same name
      if (existingGroup) {
        return res
          .status(400)
          .send({ message: "A group with that name already exists" });
      }

      const newGroup = new Group({
        groupName: data.groupName,
        members: members,
        groupRecommendations: groupRecommendations,
      });

      // TODO SET ACTIVE GROUP FOR CURRENT USER
      newGroup
        .save()
        .then((savedGroup) => {
          res.status(201).json({ savedGroup });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      //Add redirect to login
      console.log("Error, redirecting...");
      res.status(401).json({ error: "Unauthorized, please sign in." });
    }
  } catch (error) {
    console.log("Group creation error: " + error);
    res.status(500).json({ error });
  }
};

// Add/invite? user to group
// TO DO NEXT
export const addUser = async (req, res) => {
  try {
    const { group, user } = req.body;

    const inquiry = await GroupInquiry.findOne({
      "group._id": group._id,
      "user._id": user._id,
    });
    const existingGroup = await Group.findOne({ _id: group._id });

    if (!req.isAuthenticated()) {
      return res
        .status(401)
        .json({ message: "Unauthorized access. Please login." });
    }
    // Check that the user is an admin of the group
    if (!checkAdmin(req.user, existingGroup)) {
      return res.status(401).json({
        message:
          "You do not have permissions to add users. Please contact a group admin.",
      });
    }

    // That the request exists
    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry does not exist." });
    }

    // That the group exists
    if (!existingGroup) {
      return res.status(404).json({ message: "Group cannot be found." });
    }

    // That the applicant is not already a member, if they are delete the inquiry
    if (checkAdmin(user, existingGroup)) {
      const deleteInquiry = await GroupInquiry.deleteOne({ _id: inquiry._id });
      if (deleteInquiry) {
        return res.status(409).json({
          message:
            "User is already a member of the group. Deleting join request.",
        });
      }
    }

    existingGroup.members.push(user);

    const savedGroup = await existingGroup.save();
    if (!savedGroup) {
      return res
        .status(500)
        .json({ message: "Something went wrong, could not save group." });
    }

    if (savedGroup) {
      const deleteInquiry = await GroupInquiry.deleteOne({ _id: inquiry._id });
      if (deleteInquiry) {
        return res.status(201).json({ savedGroup });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

// POST: Change user's role
// Req.body
// {
//    group: { id, groupName},
//    user: { id, username, picturePath},
//    newRole: "admin"/"member",
// }
export const changeUserRole = async (req, res) => {
  try {
    const { group, user, newRole } = req.body;
    const existingGroup = await Group.findOne({ _id: group._id });
    const member = existingGroup.members.find(
      (m) => m.username === user.username
    );

    // ========================================================================================================
    // Consider refactoring into single function that returns a boolean
    // Maybe use validators, or a function that takes an array of check functions and returns true or false
    // ========================================================================================================

    // Checks
    // Check user is logged in
    if (!req.isAuthenticated()) {
      return res
        .status(401)
        .json({ message: "Unauthorized access. Please login." });
    }

    // That the group exists
    if (!existingGroup) {
      return res.status(404).json({ message: "Group cannot be found." });
    }

    // Check that the user is an admin of the group
    if (!checkAdmin(req.user, existingGroup)) {
      return res.status(401).json({
        message:
          "You do not have permissions to add users. Please contact a group admin.",
      });
    }

    // Check that user who is having their role changed is a part of the group
    if (!roleCheck(user, existingGroup)) {
      return res
        .status(404)
        .json({ message: "User is not a member of the group." });
    }

    // Check that user role being changed is actually different
    if (roleCheck(user, existingGroup) === newRole) {
      return res
        .status(400)
        .json({ message: `User is already a(n) ${newRole}` });
    }
    // ========================================================================================================
    // ========================================================================================================

    const result = await Group.updateOne(
      { _id: existingGroup._id, "members.username": user.username },
      {
        $set: {
          "members.$.role": newRole,
        },
      }
    );

    if (result.nModified === 1) {
      return res
        .status(201)
        .json({ message: `${user.username}'s role changed to ${newRole}` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

// Remove user from group
export const removeUser = async (req, res) => {
  try {
    const { group, user } = req.body;
    const existingGroup = await Group.findOne({ _id: group._id });
    const member = existingGroup.members.find(
      (m) => m.username === user.username
    );

    if (!req.isAuthenticated()) {
      return res
        .status(401)
        .json({ message: "Unauthorized access. Please login." });
    }

    // That the group exists
    if (!existingGroup) {
      return res.status(404).json({ message: "Group cannot be found." });
    }

    // Check that the user is an admin of the group
    if (roleCheck(req.user, existingGroup) !== "admin") {
      return res.status(401).json({
        message:
          "You do not have permissions to add users. Please contact a group admin.",
      });
    }

    // Check that user who is having their role changed is a part of the group
    if (!roleCheck(user, existingGroup)) {
      return res
        .status(404)
        .json({ message: "User is not a member of the group." });
    }

    const result = await Group.updateOne(
      { _id: existingGroup._id, "members.username": user.username },
      {
        $pull: {
          members: { _id: user._id },
        },
      }
    );

    if (result.nModified === 1) {
      return res.status(201).json({
        message: `${user.username} has been removed from ${group.groupName}`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

// Delete group
// Consider adding role for website admin to be able to remove groups.
export const deleteGroup = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      res.status(404).json({ message: "Invalid ID." });

    const existingGroup = await Group.findById(req.params.id);

    if (!req.isAuthenticated()) {
      return res
        .status(401)
        .json({ message: "Unauthorized access. Please login." });
    }

    // That the group exists
    if (!existingGroup) {
      return res.status(404).json({ message: "Group cannot be found." });
    }

    // Check that the user is an admin of the group
    if (roleCheck(req.user, existingGroup) !== "admin") {
      return res.status(401).json({
        message:
          "You do not have permissions to delete this group. Please contact a group admin.",
      });
    }

    const group = await Group.findByIdAndDelete(req.params.id);

    if (group) {
      res.status(200).json({ message: `Group deleted successfully!` });
    } else {
      res.status(404).json({ error: "Group not found." });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
