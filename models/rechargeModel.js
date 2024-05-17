const mongoose = require("mongoose");

const rechargeSchema = mongoose.Schema(
    {
      units: [],
      remaining_units: {
        type: mongoose.Types.Decimal128,
        required: true,
        trim: true,
      },
      tenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tenant",
        required: true,
      },
    },{
        timestamps: true,
    }
)

const Recharge = mongoose.model("Recharge", rechargeSchema);

module.exports = Recharge;

