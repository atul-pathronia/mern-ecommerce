const createAndSendtoken = (user, statusCode, res) => {
  const token = user.getJwtToken();

  const options = {
    expiresIn: new Date(
      Date.now() + process.env.JWT_EXPIRESIN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    // sameSite: "None",
    // secure: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    status: "success",
    user,
    token,
  });
};

module.exports = createAndSendtoken;
