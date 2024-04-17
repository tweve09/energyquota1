const getTenantProfile = (req, res) => {
  const user = req.user;

  return res.render("tenant_profile", {
    user,
    currentPage: "tenant_profile",
    message: "",
  });
};

module.exports = {
  getTenantProfile,
};
