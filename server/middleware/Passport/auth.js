// TODO
// Might not need this honestly
const auth = (req, res, next) => {
  //console.log(req.session);
  console.log('Middleware');
  console.log(req.sessionID);
  console.log(req.user);
  if (req.isAuthenticated()) {
    console.log("Pass");
    //console.log(res);
    next();
  } else {
    console.log('Fail');
    res.status(401).json({ msg: "Unauthorized access" });
  }
};

export default auth;
