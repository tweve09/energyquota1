const Tenant = require("../models/tenantModel");
const getDashboard = async (req, res) => {
  const user = req.user;
  const number_tenants = await Tenant.countDocuments({ house_owner: user._id });
  res.render("owner_dashboard", {
    user,
    currentPage: "dashboard",
    number_tenants,
  });
};

module.exports = {
  getDashboard,
};
