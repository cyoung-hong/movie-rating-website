import Group from "../models/Group.js";
import GroupInquiry from "../models/GroupInquiry.js";

const roleCheck = (user, group) => {
  const member = group.members.find((m) => m.username === user.username);
  return member?.role;
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
      const members = [];

      const existingGroup = await Group.findOne({ groupName: data.groupName });
      //Check if a group exists with the same name
      if (existingGroup) {
        return res
          .status(400)
          .send({ message: "A group with that name already exists" });
      }

      const foundingMember = {
        username: req.user.username,
        picturePath: req.user.picturePath,
        role: "admin",
      };
      members.push(foundingMember);

      const newGroup = new Group({
        groupName: data.groupName,
        members: members,
      });

      newGroup
        .save()
        .then((savedReq) => {
          res.status(201).json({ savedReq });
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
    console.log("Group creation error");
    res.status(500).json({ error });
  }
};

// Add/invite? user to group
// TO DO NEXT
export const addUser = async (req, res) => {
  try {
    const { group, user } = req.body;

    const inquiry = await GroupInquiry.findOne({
      "group.id": group.id,
      "user.id": user.id,
    });
    const existingGroup = await Group.findOne({ _id: group.id });

    if (!req.isAuthenticated()) {
      return res
        .status(401)
        .json({ message: "Unauthorized access. Please login." });
    }
    // Check that the user is an admin of the group
    if (roleCheck(req.user, existingGroup) !== "admin") {
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
    if (roleCheck(user, existingGroup)) {
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
    const existingGroup = await Group.findOne({ _id: group.id });
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
    const { group, user, newRole } = req.body;
    const existingGroup = await Group.findOne({ _id: group.id });
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
  } catch {}
};

// Delete group
export const deleteGroup = async (req, res) => {};
