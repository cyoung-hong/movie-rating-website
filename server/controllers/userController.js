import User from "../models/User.js";
import GroupInquiry from "../models/GroupInquiry.js";

export const getGroupInvites = async (req, res) => {
  if (req.isAuthenticated()) {
    const invites = await GroupInquiry.find({
      origin: "group",
      "user.id": req.user._id,
    });
  }
};
