const { validateSuggestedKeywordGenLimit } = require("../middlewares");
const { inputs, keywords, projects } = require("../models");
const { internalServer, fetchSuccess } = require("../utils");
const { generate } = require("./aiGenerateController");


const setSuggestedKeyWords = async (output, projectId) => {
    const suggestedKeyWordCount = await keywords.count({ where: { projectId, suggested: true } })
    if (suggestedKeyWordCount > 0) {
        return await keywords.update({ suggested: true, phrase: output, projectId }, { where: { projectId, suggested: true } })
    } else {
        return await keywords.create({ suggested: true, phrase: output, projectId })
    }
}

const commanAction = async (projectId, req, res) => {
    const output = await generate(req, res)
    const isKeywordCreated = await setSuggestedKeyWords(output, projectId)
    await projects.increment('suggestedKwGenerateCount', {
        by: 1,
        where: { projectId }
    });
    let cleaned = output
        .replace(/```json|```/g, "")
        .trim();
    text = JSON.parse(cleaned)
    return text
}

const generateKeywords = async (req, res) => {
    const uid = req?.firebaseUser?.uid;
    const planId = req?.subsciptionData?.Plan?.planId

    const isProjectLimitValid = await validateSuggestedKeywordGenLimit(req, res)

    const data = { ...req?.body, uid, planId }
    try {
        if (isProjectLimitValid) {
            const projectId = data?.projectId
            const inputCount = await inputs.count({ where: { projectId } })
            if (inputCount > 0) {
                const isProjectUpdated = await inputs.update(data, { where: { projectId } })
                if (isProjectUpdated) {
                    const result = await commanAction(projectId, req, res)
                    return fetchSuccess(res, { text: result })
                }
            } else {
                const isProjectCreated = await inputs.create(data)
                if (isProjectCreated) {
                    const result = await commanAction(projectId, req, res)
                    return fetchSuccess(res, { text: result })
                }
            }
        }

    } catch (error) {
        return internalServer(error, res)
    }
}

module.exports = { generateKeywords }