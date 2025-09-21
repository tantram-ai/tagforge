
const { subscription, plans } = require("../models")
const { Op } = require("sequelize");

let result = {
    NOT_SUBSCRIBED: false,
    PLAN_EXPIRED: false,
    DATA: {},
    INTERNAL_SERVER: null
}

module.exports = subscriptionValidator = async (uid) => {
    try {
        const subscriptionInfo = await subscription.findAll({ where: { uid: uid } })
        if (!subscriptionInfo.length > 0) {
            result = { ...result, NOT_SUBSCRIBED: true }
        } else {
            const subsciptionData = await subscription.findOne({
                where: {
                    uid: uid,
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
                result = { ...result, PLAN_EXPIRED: true }
            }

            result.DATA = subsciptionData?.dataValues || {}
        }
        return result
    } catch (error) {
        result = { ...result, PLAN_EXPIRED: error }
        return result
    }
}
