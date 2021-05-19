// CONTINUE HERE
// MAKE A DASHBOARD
// NEED TO LIST ALL OF THE USERS RECOMMENDATIONS
// ALSO CONSIDER ERROR HANDLER

import express from "express";

import {getUsers, getUserById, joinGroup, leaveGroup, deleteUser} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/user/:id", getUserById);
router.post("/user/group/join", joinGroup);
router.post("/user/group/leave", leaveGroup);
router.delete("user/delete", deleteUser);