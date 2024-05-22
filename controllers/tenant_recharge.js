const Recharge = require("../models/rechargeModel");

const getRechargePage = (req, res) => {
    const user = req.user;

    return res.render("tenant_recharge", {
      user,
      currentPage: "tenant_recharge",
      message: "",
    });
}

const postBuyUnits = async (req, res) => {
    const user = req.user;
    const { units_value } = req.body;

    // find record
    const recharge_present = await Recharge.findOne({ tenant: user.id});
    if (recharge_present) {

      // update the remaining
      recharge_present.remaining_units = Number(recharge_present.remaining_units) + Number(units_value);
      recharge_present.units.push(units_value);
      recharge_present.save();
      
      
      return res.render("tenant_recharge", {
        user,
        currentPage: "tenant_recharge",
        message: "units bought successfully",
      });
    }

    const recharge = new Recharge({
        units: units_value,
        remaining_units: units_value,
        tenant: user._id,
        meter_number: user.meter_number,
        used_units: "0",
    });
    
    recharge.save();

    return res.render("tenant_recharge", {
      user,
      currentPage: "tenant_recharge",
      message: "Units bought successfully",
    });
}

module.exports = {
    getRechargePage,
    postBuyUnits
}