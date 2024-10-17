const UserToken = require("../models/userToken");

module.exports = (req, res, next) => {
  const authorization = req.get("Authorization");
  UserToken((userToken) => {
    const user = userToken.find((e) => e.token == authorization);
    if (!user) return res.status(401).json({ errorMessage: "Unauthorized" });
    next();
  });
};
