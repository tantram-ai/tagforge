const { subscriptionValidator, customError, internalServer } = require("../utils");

const validateSubscription = async (req, res, next) => {
    const user = req?.user?.dataValues

    const { NOT_SUBSCRIBED, PLAN_EXPIRED, DATA, INTERNAL_SERVER } = await subscriptionValidator(user?.uid)

    console.log(NOT_SUBSCRIBED, PLAN_EXPIRED, DATA, INTERNAL_SERVER)

    if (NOT_SUBSCRIBED) {
        return customError(res, "NOT_SUBSCRIBED", "Please subscribe a plan to start")
    }
    if (PLAN_EXPIRED) {
        return customError(res, "PLAN_EXPIRED", "Please update the plan to continue")
    }
    if (DATA) {
        req.subsciptionData = DATA
        next()
    }
    else {
        return internalServer(res)
    }
}

module.exports = { validateSubscription }