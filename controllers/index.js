const Tenant = require("../models/tenantModel");
const User = require("../models/userModel");
const { sendSms } = require("../utils/sendSms");

const getLanding = (req, res) => {
  return res.render("landing");
};

const getDashboard = async (req, res) => {
  const user = req.user;
  try {
    const tenants = await Tenant.find({house_owner: user._id})
    return res.render("admin_1", {
      user: user,
      tenants: tenants
    });
  } catch (error) {
    console.log(error)
  }
};

const getAddTenant = (req, res) => {
  const user = req.user
  return res.render("add_tenant", {
    message: "",
    user: user
  });
};

const postAddTenant = async (req, res) => {
  const user = req.user
  const { full_name, phone_number, house_number, password, confirm_password } =
    req.body;
  if (
    !full_name ||
    !phone_number ||
    !house_number ||
    !password ||
    !confirm_password
  ) {
    return res.status(400).render("add_tenant", {
      message: "Please provide all the inputs",
      user: user
    });
  }

  // check if passwords match
  if (password !== confirm_password) {
    return res.status(400).render("add_tenant", {
      message: "Passwords do not match",
      user: user
    });
  }
  //Check if already registered
  const tenant = await Tenant.findOne({ phone_number: phone_number });

  if (tenant) {
    return res.render("add_tenant", {
      message: "Tenant already registered.",
      user: user
    });
  }
  //save new tenant
  try {
    const newTenant = new Tenant({
      full_name: full_name,
      phone_number: phone_number,
      house_number: house_number,
      password: password,
      house_owner: req.user._id,
    });

    await newTenant.save();
    return res.render("add_tenant", {
      message: "Tenant account created succefully",
      user: user
    });
  } catch (error) {
    console.log(error)
    return res.render("add_tenant", {
      message: "Error occured",
      user: user
    });
  }
};

const getTenantLogin = (req, res) => {
  return res.render("tenant_login", {
    message: req.flash('error'),
  });
};

const getTenantHome = async (req, res) => {
  const user = req.user
  const house_owner = await User.findOne({_id: user.house_owner})
  return res.render("tenant_home", {
    user: user,
    house_owner: house_owner
  });
};

const getBuyUnit = (req, res)=>{
  const user = req.user
  return res.render("buy_unit", {
    user: user,
    message: ""
  })
}

const postBuyUnit = (req, res)=>{

  const { unit_amount } = req.body
  const user = req.user
  /* sendSms(`Hello ${user.full_name} you bought ${unit_amount} `, "+255776607453") */
  return res.render("buy_unit", {
    user: user,
    message: `You succefully bought units for ${unit_amount} shillings`
  })
}

const logOutTenant = (req, res)=>{
  req.logout((error)=>{
    if(error){
      console.log(error);
    }
    return res.render("tenant_login", {
      message: "You are logged out."
    })
  });
}
module.exports = {
  getLanding,
  getDashboard,
  getAddTenant,
  postAddTenant,
  getTenantLogin,
  getTenantHome,
  logOutTenant,
  getBuyUnit,
  postBuyUnit
};
