const getTenantDashboard = (req, res) => {
  const user = req.user;

  return res.render("tenant_dashboard", {
    user,
    currentPage: "tenant_dashboard",
  });
};

module.exports = {
  getTenantDashboard,
};
