const { Op } = require("sequelize");
const { projects } = require("../../models");

const validateProjectLimit = async (req, res) => {
    const planData = req?.subsciptionData?.data;
    const uid = req?.firebaseUser?.uid;

    const projectCount = await projects.count({
        where: {
            uid: uid,
            createdAt: {
                [Op.between]: [planData?.currentPeriodStart, planData?.currentPeriodEnd], // column name should match your model
            },
        },
    });

    if (projectCount >= planData?.Plan?.projectsLimit) {
        res.status(400).json({
            error: "Project limit reached",
            code: "PROJECT_LIMIT_REACHED",
            message: "Project limit reached please upgrade the plan",
            data: null
        })
        return false
    }
    return true
}

module.exports = { validateProjectLimit }