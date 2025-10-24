const { users } = require("../../models");
const { customError } = require("../../utils");

const validateContentGenLimit = async (req, res) => {
    const planData = req?.subsciptionData?.data;
    const uid = req?.firebaseUser?.uid;

    const userInfo = await users.findOne({
        where: {
            uid: uid,
        },
        raw: true
    });

    if (userInfo?.generationCount >= planData?.Plan?.aiGenerations) {
        customError(res, "CONTENT_GEN_LIMIT_REACHED", "Content generate limit reached please upgrade the plan")
        return false
    }
    return true
}

module.exports = { validateContentGenLimit }