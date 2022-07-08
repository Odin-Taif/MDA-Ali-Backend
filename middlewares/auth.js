const jwt = require("jsonwebtoken");

exports.isAuth = async (req, res, next) => {
  // we require the user
  const User = require("../models/user");
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decode.userId);
      if (!user) {
        return res.json({ succcess: false, message: "unauthorized accesss!" });
      }
      req.user = user;
      next();
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        return res.json({ succcess: false, message: "unauthorized accesss!" });
      }
      if (error.name === "TokenExpiredError") {
        return res.json({
          succcess: false,
          message: "sesssion expired try sign in again!",
        });
      }
      res.res.json({ succcess: false, message: "internal server errors" });
    }
  } else {
    res.json({ succcess: false, message: "unauthorized accesss!" });
  }
};
