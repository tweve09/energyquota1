const Tenant = require("../models/tenantModel");
const Recharge = require("../models/rechargeModel")


const getDashboard = async (req, res) => {
  const user = req.user;
  const number_tenants = await Tenant.countDocuments({ house_owner: user._id });
  const all_units = await Recharge.find({ meter_number: user.meter_number })

  if( !all_units ){

    return res.render("owner_dashboard", {
      user,
      currentPage: "dashboard",
      number_tenants,
      all_used: 0,
      all_remaining: 0
    })
    
  }
        
  var all_used  = 0;
  var all_remaining = 0;

  all_units.forEach((unit) => {
      all_used += Number(unit.used_units);
      all_remaining += Number(unit.remaining_units);
  })

  res.render("owner_dashboard", {
    user,
    currentPage: "dashboard",
    number_tenants,
    all_used: all_used.toFixed(2),
    all_remaining: all_remaining.toFixed(2)
  });
};

module.exports = {
  getDashboard,
};
