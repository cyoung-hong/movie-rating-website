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
// TODO CHECK WHY IS STORED?!
export const createGroup = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const data = req.body;
      const array = [];

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

      array.push(foundingMember);

      const newGroup = new Group({
        groupName: data.groupName,
        members: array,
      });

      newGroup
        .save()
        .then((savedReq) => {
          console.log("New group");
          console.log(newGroup);
          res.status(201).json({ savedReq });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      //Add redirect to login
      console.log("Redirecting...");
      res.status(401).json({ error: "Unauthorized, please sign in." });
    }
  } catch (error) {
    console.log("Group creation error");
    res.status(500).json({ error });
  }
};

// Add/invite? user to group
// TO DO NEXT
export const addUser = async (req, res) => {};

// Change user's role
export const changeUserRole = async (req, res) => {};

// Remove user from group
export const removeUser = async (req, res) => {};

// Delete group
export const deleteGroup = async (req, res) => {};
