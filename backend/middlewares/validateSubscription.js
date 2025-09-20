const { subscription, plans } = require("../models")
const { Op } = require("sequelize");

module.exports = validateSubscription = async (req, res, next) => {
    const user = req?.user?.dataValues

    try {
        const subscriptionInfo = await subscription.findAll({ where: { uid: user?.uid } })
        if (!subscriptionInfo.length > 0) {
            return res.status(401).json({ error: "Subscription not found", code: "NOT_SUBSCRIBED", message: "Please subscribe a plan to start", data: null })
        } else {
            const subsciptionData = await subscription.findOne({
                where: {
                    uid: user.uid,
                    currentPeriodEnd: { [Op.gt]: new Date() }
                },
                attributes: ["status", "plan", "currentPeriodStart", "currentPeriodEnd", "id"],
                include: [
                    {
                        model: plans,
                        attributes: ["planId", "name", "projectsLimit", "keywordsPerProject", "aiGenerations", "maxContentLength", "billingCycle", "features"],
                    }
                ],
                order: [[plans, "price", "DESC"]],
                raw: false,
            })
            if (!subsciptionData) {
                return res.status(401).json({ error: "Plan expired", code: "PLAN_EXPIRED", message: "Please update the plan to continue", data: null })
            }

            req.subsciptionData = subsciptionData?.dataValues || {}
            next();
        }
    } catch (error) {
        return res.status(500).json({ error: error, code: "INTERNAL_SERVER", message: "Internal Server Error", data: null });
    }
}
