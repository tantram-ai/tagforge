const express = require('express');
const { plans } = require('../models');
const subscription = require('../models/subscription');
const { Op } = require('sequelize');
const router = express.Router();

router.get('/getPlans', async (req, res) => {
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
            const isUserHasPlan = await subscription.findAll({ where: { uid: decoded.uid } })
            if (!isUserHasPlan) {
                res.status(200).json({ error: "", code: "SUCCESS", message: "Plans fetched successfully", data: getAllPlans() })
            } else {
                return res.status(200).json({ error: "", code: "SUCCESS", message: "Plans fetched successfully", data: getAllPlans(true) })
            }
        }

    } catch (error) {
        return res.status(500).json({ error: error, code: "INERNAL_SERVER", message: "Internal Server error", data: null })
    }
})

module.exports = router