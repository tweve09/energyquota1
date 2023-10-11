const User = require("../models/userModel");

const getRegisterUser = (req, res) => {
  return res.render("register", {
    message: ""
  });
};

const getLoginUser = (req, res) => {
  return res.render("login", {
    message:  req.flash('error')
  });
};

const postRegisterUser = async (req, res) => {
  const { full_name, phone_number, meter_number, password, confirm_password } =
    req.body;
  /*     console.log(full_name)
    console.log(phone_number)
    console.log(meter_number)
    console.log(password)
    console.log(confirm_password) */
  if (
    !full_name ||
    !phone_number ||
    !meter_number ||
    !password ||
    !confirm_password
  ) {
    return res.status(400).render("register", {
      message: "Please provide all the inputs",
    });
  }

  // check if passwords match
  if (password !== confirm_password) {
    return res.status(400).render("register", {
      message: "Passwords do not match",
    });
  }

  // check user exist
  const user = await User.findOne({ phone_number: phone_number });

  if (user) {
    console.log(user)
    return res.render("register", {
      message: "User already exist",
    });
  }

  User.create({
    full_name,
    phone_number,
    meter_number,
    password
  }).then((user) => {
    console.log(user)
    return res.status(201).render("register", {
        message: "User registered succefully. Login to continue"
    })
  }).catch((err) => {
    console.log(err)
  });
};

const logOutUser = (req, res)=>{
  req.logout((error)=>{
    if(error){
      console.log(error);
    }
    return res.render("login", {
      message: "You are logged out."
    })
  });
}

module.exports = {
  getRegisterUser,
  getLoginUser,
  postRegisterUser,
  logOutUser
};
