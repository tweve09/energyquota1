const getDashboard = (req, res) => {
  const user = req.user;
  res.render("owner_dashboard", {
    user: user,
    currentPage: "dashboard",
  });
};

module.exports = {
  getDashboard,
};
