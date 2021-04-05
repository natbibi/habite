const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const header = req.headers["authorization"];
  if (header) {
    const token = header.split(" ")[1];
    jwt.verify(token, process.env.SECRET, async (err, data) => {
      try {
        //set a response local variables for user specific authentication
        res.locals.user = data.username;
        next();
      } catch (err) {
        res.status(403).json({ err: "Invalid token" });
      }
    });
  } else {
    res.status(403).json({ err: "Missing token" });
  }
}
module.exports = {
  verifyToken,
};
