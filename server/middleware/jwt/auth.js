import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomToken = token.length < 500;

    let decodedToken;

    if (token && isCustomToken) {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decodedToken?.id;
    } else {
      decodedToken = jwt.decode(token);
      req.userId = decodedToken?.sub;
    }
    next();
  } catch (err) {
    console.log(err);
  }
};

export default auth;