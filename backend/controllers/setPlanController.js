const { subscription } = require("../models")
const { addMonths, addYears } = require("date-fns");
const { subscriptionValidator, cookieSettings } = require("../utils");
const planDurationInMonths = 1;
const jwt = require("jsonwebtoken");


const setPlan = async (req, res) => {
    const data = req.body
    const uid = req?.firebaseUser?.uid
    const currentDate = new Date()
    const endDate = () => {
        if (data?.preferedBillingCycle === "monthly") {
            return addMonths(currentDate, planDurationInMonths)
        } else {
            return addYears(currentDate, planDurationInMonths)
        }
    }

    const UpdatedData = {
        ...data,
        currentPeriodStart: currentDate,
        currentPeriodEnd: endDate(),
        status: "active",
        uid: uid
    }

    try {
        const isPlancreated = await subscription.create(UpdatedData)
        if (isPlancreated) {
            const { DATA, INTERNAL_SERVER } = await subscriptionValidator(uid)
            if (INTERNAL_SERVER) {
                return res.status(500).json({
                    error: INTERNAL_SERVER,
                    code: "INTERNAL_SERVER",
                    message: "Internal Server Error",
                    data: null
                });
            }
            const planData = jwt.sign(DATA, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });

            res.cookie("planData", planData, cookieSettings);

            return res.status(200).json({
                error: "",
                code: "SUCCESS",
                message: "Plan subscribed successfully",
                data: UpdatedData
            })
        } else {
            return res.status(500).json({
                error: "Internal Server error",
                code: "INTERNAL_SERVER",
                message: "Internal Server error",
                data: null
            })
        }
    } catch (error) {
        return res.status(500).json({
            error: error, code: "INTERNAL_SERVER",
            message: "Internal Server error",
            data: null
        })
    }
}

module.exports = { setPlan }