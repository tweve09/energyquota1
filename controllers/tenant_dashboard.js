const Owner = require("../models/ownerModel");

const getTenantDashboard = async (req, res) => {
  const user = req.user;
  const owner = await Owner.findOne({ _id: user.house_owner });

  return res.render("tenant_dashboard", {
    user,
    currentPage: "tenant_dashboard",
    owner,
  });
};

module.exports = {
  getTenantDashboard,
};
