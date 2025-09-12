const { subscription, plans } = require("../models")
const { Op } = require("sequelize");

module.exports = validateSubscription = async (req, res, next) => {
    const user = req?.user?.dataValues

    try {
        const subscriptionInfo = await subscription.findAll({ where: { uid: user?.uid } })
        if (!subscriptionInfo.length > 0) {
            return res.status(401).send({ error: "Subscription not found", message: "Please subscribe a plan to start", success: false, data: null })
        } else {
            const subsciptionData = await subscription.findOne({
                where: {
                    uid: user.uid,
                    currentPeriodEnd: { [Op.gt]: new Date() }
                },
                attributes: ["status","plan", "currentPeriodStart", "currentPeriodEnd", "id"],
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
                return res.status(401).send({ error: "Plan expired", message: "Please update the plan to continue", success: false, data: null })
            }

            req.subsciptionData = subsciptionData?.dataValues || {}
            next();
        }
    } catch (error) {
        return res.status(500).send({ error:error, message: "Internal Server Error", success: false, data: null });
    }
}
