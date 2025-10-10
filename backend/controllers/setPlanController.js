const { subscription } = require("../models")
const { addMonths, addYears } = require("date-fns");
const { subscriptionValidator, cookieSettings, internalServer, successWithMessage } = require("../utils");
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
        const isPlanCreated = await subscription.create(UpdatedData)
        if (isPlanCreated) {
            const { DATA, INTERNAL_SERVER } = await subscriptionValidator(uid)
            if (INTERNAL_SERVER) {
                return internalServer(INTERNAL_SERVER, res)
            }
            const planData = jwt.sign(DATA, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });

            res.cookie("planData", planData, cookieSettings);

            return successWithMessage(res, "Plan subscribed successfully")
        } else {
            return internalServer(null, res)
        }
    } catch (error) {
        return internalServer(error, res)
    }
}

module.exports = { setPlan }