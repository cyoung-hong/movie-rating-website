import GroupInquiry from "../models/GroupInquiry.js";

export const createInquiry = async (req, res) => {
  try {
    const { group, user } = req.body;

    if (req.isAuthenticated()) {
      const foundInquiry = await GroupInquiry.findOne({
        "group.id": group.id,
        "user.id": user.id,
      });

      if (foundInquiry) {
        res.status(409).json({ error: "Request already exists" });
      } else {
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
      }
    } else {
      //Add redirect to login
      console.log("Redirecting...");
      res.status(401).json({ error: "Unauthorized, please sign in." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
