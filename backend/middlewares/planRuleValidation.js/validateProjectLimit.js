const { Op } = require("sequelize");
const { projects } = require("../../models");
const { customError } = require("../../utils");

const validateProjectLimit = async (req, res) => {
    const planData = req?.subsciptionData?.data;
    const uid = req?.firebaseUser?.uid;

    const projectCount = await projects.count({
        where: {
            uid: uid,
            createdAt: {
                [Op.between]: [planData?.currentPeriodStart, planData?.currentPeriodEnd],
            },
        },
    });

    if (projectCount >= planData?.Plan?.projectsLimit) {
        customError(res,"PROJECT_LIMIT_REACHED","Project limit reached please upgrade the plan")
        return false
    }
    return true
}

module.exports = { validateProjectLimit }