exports.postLogin = (req, res, next) => {
  console.log("hero");
  res.setHeader("Set-Cookie", "loggedIn : true");
};
