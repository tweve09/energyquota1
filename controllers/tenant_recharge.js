const getRechargePage = (req, res) => {
    const user = req.user;

    return res.render("tenant_recharge", {
      user,
      currentPage: "tenant_recharge",
      message: "",
    });
}

module.exports = {
    getRechargePage
}