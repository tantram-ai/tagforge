const { inputs } = require("../models");
const { internalServer } = require("../utils");
const { generate } = require("./aiGenerateController");

const generateKeywords = async (req, res) => {
    const uid = req?.firebaseUser?.uid;
    const planId = req?.subsciptionData?.Plan?.planId

    const data = { ...req?.body, uid, planId }
    try {
        const inputCount = await inputs.count({ where: { projectId: data?.projectId } })

        if (inputCount > 0) {
            const isProjectUpdated = await inputs.update(data, { where: { projectId: data?.projectId } })
            if (isProjectUpdated) {
                await generate(req, res)
            }
        } else {
            const isProjectCreated = await inputs.create(data)
            if (isProjectCreated) {
                await generate(req, res)
            }
        }

    } catch (error) {
        return internalServer(error, res)
    }
}

module.exports = { generateKeywords }