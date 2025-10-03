const { subscriptionValidator } = require("../utils");

const validateSubscription = async (req, res, next) => {
    const user = req?.user?.dataValues

    const { NOT_SUBSCRIBED, PLAN_EXPIRED, DATA, INTERNAL_SERVER } = await subscriptionValidator(user?.uid)

    if (NOT_SUBSCRIBED) {
        return res.status(400).json({ error: "Subscription not found", code: "NOT_SUBSCRIBED", message: "Please subscribe a plan to start", data: null })
    }
    if (PLAN_EXPIRED) {
        return res.status(400).json({ error: "Plan expired", code: "PLAN_EXPIRED", message: "Please update the plan to continue", data: null })
    }
    if (DATA) {
        req.subsciptionData = DATA
        next()
    }
    else {
        return res.status(500).json({ error: INTERNAL_SERVER, code: "INTERNAL_SERVER", message: "Internal Server Error", data: null });
    }
}

module.exports = { validateSubscription }