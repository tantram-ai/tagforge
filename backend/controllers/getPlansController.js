const { Op } = require('sequelize');
const { plans, subscription } = require('../models');
const { admin } = require('../connections');

const getPlans = async (req, res) => {
    const idToken = req?.cookies?.token || null;

    const excludeFreePlan = {
        where: {
            price: { [Op.ne]: 0 }
        },
        raw: true
    }

    try {
        const getAllPlans = async (excludeFree = false) => {
            const plansData = await plans.findAll(excludeFree ? { ...excludeFreePlan } : { raw: true })
            return plansData
        }

        if (!idToken) {
            return res.status(200).json({ error: "", code: "SUCCESS", message: "Plans fetched successfully", data: await getAllPlans() })
        } else {
            const decoded = await admin.auth().verifyIdToken(idToken);
            const isUserHasPlan = await subscription.findAll({ where: { uid: decoded?.uid } })
            if (isUserHasPlan?.length <= 0) {
                res.status(200).json({ error: "", code: "SUCCESS", message: "Plans fetched successfully", data: await getAllPlans() })
            } else {
                return res.status(200).json({ error: "", code: "SUCCESS", message: "Plans fetched successfully", data: await getAllPlans(true) })
            }
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error, code: "INERNAL_SERVER", message: "Internal Server error", data: null })
    }
}

module.exports = {getPlans}