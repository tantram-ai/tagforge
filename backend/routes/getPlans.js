const express = require('express');
const { plans } = require('../models');
const subscription = require('../models/subscription');
const router = express.Router();

router.get('/plans', async (req, res) => {
    const idToken = req.cookies.token;

    try {
        const getAllPlans = async () => {
            const plansData = await plans.findAll({ raw: true })
            return plansData
        }

        if (!idToken) {
            return res.status(200).json({ error: "", code: "SUCCESS", message: "Plans fetched successfully", data: getAllPlans() })
        } else {
            const decoded = await admin.auth().verifyIdToken(idToken);
            const isUserHasPlan = await subscription.findAll({ where: { uid: decoded.uid } })
            if (!isUserHasPlan) {
                res.status(200).json({ error: "", code: "SUCCESS", message: "Plans fetched successfully", data: getAllPlans() })
            } else {
                const plansData = await plans.findAll({
                    where: {
                        price: { [Op.ne]: 0 }
                    }
                });
               return res.status(200).json({ error: "", code: "SUCCESS", message: "Plans fetched successfully", data: plansData })
            }
        }

    } catch (error) {
        return res.status(500).json({ error: error, code: "INERNAL_SERVER", message: "Internal Server error", data: null })
    }
})

module.exports = router