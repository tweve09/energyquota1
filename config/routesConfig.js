const indexRouter = require("../routes/index");
const ownersRouter = require("../routes/owners");
const dashboardRouter = require("../routes/dashboard");
const devicesRouter = require("../routes/devices");
const tenantsRouter = require("../routes/tenants");
const tenantAccountRouter = require("../routes/tenants_account");
module.exports = function (app) {
  app.use("/", indexRouter);
  app.use("/owners", ownersRouter);
  app.use("/dashboard", dashboardRouter);
  app.use("/tenants", tenantsRouter);
  app.use("/devices", devicesRouter);
  app.use("/tenants_account", tenantAccountRouter);
};
