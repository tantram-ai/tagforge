const { validateSuggestedKeywordGenLimit } = require("../middlewares");
const { inputs, keywords, projects } = require("../models");
const { internalServer, fetchSuccess } = require("../utils");
const { generate } = require("./aiGenerateController");
const mockData = "```json\n[\n    {\"keyword\": \"sustainable fashion trends\", \"intent\": \"informational\"},\n    {\"keyword\": \"best eco-friendly clothing brands\", \"intent\": \"informational\"},\n    {\"keyword\": \"organic cotton clothing for millennials\", \"intent\": \"informational\"},\n    {\"keyword\": \"affordable sustainable fashion\", \"intent\": \"transactional\"},\n    {\"keyword\": \"eco-friendly outfits for everyday wear\", \"intent\": \"informational\"},\n    {\"keyword\": \"buy sustainable apparel online\", \"intent\": \"transactional\"},\n    {\"keyword\": \"why choose sustainable fashion\", \"intent\": \"informational\"},\n    {\"keyword\": \"sustainable brands to watch\", \"intent\": \"informational\"},\n    {\"keyword\": \"eco-conscious clothing materials\", \"intent\": \"informational\"},\n    {\"keyword\": \"organic cotton vs conventional cotton\", \"intent\": \"informational\"},\n    {\"keyword\": \"sustainable fashion for millennials\", \"intent\": \"informational\"},\n    {\"keyword\": \"how to build a sustainable wardrobe\", \"intent\": \"informational\"},\n    {\"keyword\": \"fashion brands using organic materials\", \"intent\": \"informational\"},\n    {\"keyword\": \"affordable eco-friendly clothing options\", \"intent\": \"transactional\"},\n    {\"keyword\": \"where to buy organic cotton clothing\", \"intent\": \"transactional\"},\n    {\"keyword\": \"impact of fast fashion\", \"intent\": \"informational\"},\n    {\"keyword\": \"eco-friendly fashion tips\", \"intent\": \"informational\"},\n    {\"keyword\": \"sustainable fashion shopping guide\", \"intent\": \"informational\"},\n    {\"keyword\": \"best sustainable clothing sites\", \"intent\": \"navigational\"},\n    {\"keyword\": \"eco-friendly clothing for men\", \"intent\": \"informational\"},\n    {\"keyword\": \"ethical fashion certifications\", \"intent\": \"informational\"}\n]\n```"


const setSuggestedKeyWords = async (output, projectId) => {
    const suggestedKeyWordCount = await keywords.count({ where: { projectId, suggested: true } })
    if (suggestedKeyWordCount > 0) {
        return await keywords.update({ suggested: true, phrase: output, projectId }, { where: { projectId, suggested: true } })
    } else {
        return await keywords.create({ suggested: true, phrase: output, projectId })
    }
}

const commanAction = async (projectId, req, res) => {
    // const output = await generate(req, res)
    // const text = output?.content?.[0]?.text || "";
    // let cleaned = text.replace(/```json|```/g, "").trim();
    let cleaned = mockData.replace(/```json|```/g, "").trim();

    const isKeywordCreated = await setSuggestedKeyWords(cleaned, projectId)
    await projects.increment('suggestedKwGenerateCount', {
        by: 1,
        where: { projectId }
    });

    result = JSON.parse(cleaned)
    return result
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