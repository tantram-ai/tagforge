const { Op } = require('sequelize');
const { plans, subscription } = require('../models');
const { admin } = require('../connections');
const { fetchSuccess, internalServer } = require('../utils');

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
            return fetchSuccess(res, await getAllPlans())
        } else {
            const decoded = await admin.auth().verifyIdToken(idToken);
            const isUserHasPlan = await subscription.findAll({ where: { uid: decoded?.uid } })
            if (isUserHasPlan?.length <= 0) {
                return fetchSuccess(res, await getAllPlans())
            } else {
                return fetchSuccess(res, await getAllPlans(true))
            }
        }

    } catch (error) {
        return internalServer(error, res)
    }
}

module.exports = { getPlans }