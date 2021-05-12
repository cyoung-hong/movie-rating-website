import GroupInquiry from "../models/GroupInquiry.js";

export const createInquiry = async (req, res) => {
  try {
    const { group, user } = req.body;
    const foundInquiry = await GroupInquiry.findOne({
      "group.id": group.id,
      "user.id": user.id,
    });

    if (!req.isAuthenticated()) {
      return res
        .status(401)
        .json({ message: "Unauthorized access. Please login." });
    }

    if (foundInquiry) {
        return res.status(409).json({ error: "Request already exists" });
    } 
    
    const newInquiry = new GroupInquiry({
      group,
      user,
    });

    const savedInquiry = await newInquiry.save();

    if (savedInquiry) {
      return res.status(201).json({ savedInquiry });
    }

    if (!savedInquiry) {
      return res.status(500).json({ message: "Unable to save request." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export const deleteInquiryById = async(req,res) => {
  
}

