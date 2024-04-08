const Tenant = require("../models/tenantModel");
const { sendEmail } = require("../utils/sendEmail");

// function to generate passwords for registered tenants
const generateRandomPassword = (length) => {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

const getTenants = async (req, res) => {
  const user = req.user;
  const tenants = await Tenant.find({});
  res.render("owner_tenants", {
    user,
    currentPage: "tenants",
    tenants,
  });
};

const getTenantsRegister = (req, res) => {
  const user = req.user;
  res.render("owner_tenants_register", {
    user: user,
    currentPage: "tenants",
    message: "",
  });
};

const postTenantRegister = async (req, res) => {
  const { name, email, phone_number, house_number } = req.body;
  const user = req.user;

  //validate data
  if (!name || !email || !phone_number || !house_number) {
    return res.render("owner_tenants_register", {
      user: user,
      currentPage: "tenants",
      message: "",
    });
  }

  // check if user is already registered
  const tenant = await Tenant.findOne({ email: email });
  if (tenant) {
    return res.render("owner_tenants_register", {
      user: user,
      currentPage: "tenants",
      message: "Tenant already registered",
    });
  }

  // save tenant account
  try {
    const password = generateRandomPassword(8);

    const new_tenant = new Tenant({
      name,
      email,
      phone_number,
      house_number,
      password,
      house_owner: user.id,
    });

    await new_tenant.save();
    const loginUrl = `${process.env.FRONTEND_URL}/tenant-accounts/login`;

    const subject = "EnergyQuota - Tenant account credentials.";
    const context = {
      name,
      email,
      password,
      loginUrl,
      landlord: user.name,
    };
    const template = "new_tenant";

    const send_to = email;
    const sent_from = process.env.EMAIL_USER;

    await sendEmail(subject, template, context, send_to, sent_from);
    return res.render("owner_tenants_register", {
      user: user,
      currentPage: "tenants",
      message:
        "Tenant registered successfully, Login credentials sent to tenant email.",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getTenants,
  getTenantsRegister,
  postTenantRegister,
};
