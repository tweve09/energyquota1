const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    full_name :{
        type: String,
        required: true
    },
    phone_number: {
        type: Number,
        unique: true,
        trim: true
    },
    meter_number: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tenants: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tenant"
    }
},
{
    timestamps: true
}
);

// Hash the password before saving it
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  });

//model from userSchema

const User = mongoose.model("User", userSchema);

// exporting

module.exports = User;
