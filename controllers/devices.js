const { getSocketIO} = require("../socketHandler")
const Recharge = require("../models/rechargeModel")
const Tenant = require("../models/tenantModel")

const io = getSocketIO()

const handleDeviceData = async (req, res) => {
    const { meter_number, tenants } = req.body;

    try {
        const new_tenants = [];

        for (const tenant of tenants) {
            // Fetch the tenant from the database
            const tenant_db = await Tenant.findOne({ tenant_id: tenant.tenant_id });
            if (!tenant_db) {
                // Handle the case where the tenant is not found
                console.log(`Tenant not found: ${tenant.tenant_id}`);
                continue;
            }

            // Fetch the recharge information
            const remaining = await Recharge.findOne({ tenant: tenant_db._id });
            if (!remaining) {
                // Handle the case where the remaining units are not found
                console.log(`Remaining units not found for tenant: ${tenant.tenant_id}`);
                continue;
            }

            // Calculate the new remaining units
            const new_remaining = Number(remaining.remaining_units) - Number(tenant.units_used);
            const new_used = Number(remaining.used_units) + Number(tenant.units_used);

            // Update the remaining units in the database
            const updatedRecharge = await Recharge.findOneAndUpdate(
                { tenant: tenant_db._id },
                { 
                    $set: { 
                      remaining_units: new_remaining.toFixed(2), 
                      used_units: new_used.toFixed(2)
                    } 
                },
                { new: true }
            );

            // Add the updated tenant information to the new_tenants array
            new_tenants.push({
                tenant_id: tenant_db.tenant_id,
                remaining_units: new_remaining
            });

            //emit to socket room
            meter_data = {
                remaining: new_remaining.toFixed(2),
                used: new_used.toFixed(2)
            }
            io.to(tenant_db.tenant_id).emit("data", meter_data);
        }

        const all_units = await Recharge.find({ meter_number: meter_number })
        
        let all_used  = 0;
        let all_remaining = 0;

        all_units.forEach((unit) => {
            all_used += Number(unit.used_units);
            all_remaining += Number(unit.remaining_units);
        })

        all_tenants = {
            used: all_used.toFixed(2),
            remaining: all_remaining.toFixed(2),
        }

        // house owner socket
        io.to(meter_number).emit("all_data", all_tenants);

        // Send the response back with the updated tenant information
        return res.json({
            meter_number,
            tenants: new_tenants
        });


    } catch (error) {
        // Handle any unexpected errors
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}; 


module.exports = {
    handleDeviceData
}
