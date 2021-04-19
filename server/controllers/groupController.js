import Group from "../models/Group.js";

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
    if(req.isAuthenticated()) {
      const data = req.body;

      
    }
  } catch (error) {
    res.status(500).json({error});
  }
};

// Add/invite? user to group
export const addUser = async (req, res) => {
    
};

// Change user's role
export const changeUserRole = async (req, res) => {};

// Remove user from group
export const removeUser = async (req, res) => {};

// Delete group
export const deleteGroup = async (req, res) => {};
