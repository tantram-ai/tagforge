const { subscription } = require("../models")
const { addMonths } = require("date-fns");
const planDurationInMonths = 1;

module.exports = setPlan = async (req, res) => {
    const data = req.body
    const endDate = addMonths(new Date(), planDurationInMonths)
    const UpdatedData = { ...data, CurrentPeriodStart: new Date(), currentPeriodEnd: endDate, status: "active" }

    try {
        const isPlancreated = await subscription.create(UpdatedData)
        if (isPlancreated) {
            return res.status(200).json({ error: "", code: "SUCCESS", message: "Plan subscribed successfully", data: UpdatedData })
        } else {
            return res.status(500).json({ error: "Internal Server error", code: "INTERNAL_SERVER", message: "Internal Server error", data: null })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error, code: "INTERNAL_SERVER", message: "Internal Server error", data: null })
    }
}