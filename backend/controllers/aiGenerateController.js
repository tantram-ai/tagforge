const { keywordSuggestion, contentPrompt } = require("../utils");
const axios = require("axios");


const generate = async (req, res) => {
    const { promptType } = req?.body
    const plan = req?.subsciptionData?.data?.Plan?.dataValues

    const prompt = (type) => {
        switch (type) {
            case "KEYWORD":
                return keywordSuggestion(req?.body)
            case "CONTENT":
                return contentPrompt(req?.body, plan)
            default:
                return "";
        }
    }

    try {
        const model = process.env.GPT_MODEL || 'gpt-4o-mini';
        const payload = {
            model,
            input: prompt(promptType),
        };

        const resp = await axios.post(process.env.OPENAI_BASE_URL, payload, {
            headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }
        });

        return resp?.data?.output[0]

    } catch (error) {
        throw error
    }
}

module.exports = { generate }