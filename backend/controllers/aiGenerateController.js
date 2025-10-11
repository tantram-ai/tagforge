const { keywordSuggestion, internalServer, fetchSuccess } = require("../utils");
const axios = require("axios");

const mockData = "```json\n[\n    {\"keyword\": \"sustainable fashion trends\", \"intent\": \"informational\"},\n    {\"keyword\": \"best eco-friendly clothing brands\", \"intent\": \"informational\"},\n    {\"keyword\": \"organic cotton clothing for millennials\", \"intent\": \"informational\"},\n    {\"keyword\": \"affordable sustainable fashion\", \"intent\": \"transactional\"},\n    {\"keyword\": \"eco-friendly outfits for everyday wear\", \"intent\": \"informational\"},\n    {\"keyword\": \"buy sustainable apparel online\", \"intent\": \"transactional\"},\n    {\"keyword\": \"why choose sustainable fashion\", \"intent\": \"informational\"},\n    {\"keyword\": \"sustainable brands to watch\", \"intent\": \"informational\"},\n    {\"keyword\": \"eco-conscious clothing materials\", \"intent\": \"informational\"},\n    {\"keyword\": \"organic cotton vs conventional cotton\", \"intent\": \"informational\"},\n    {\"keyword\": \"sustainable fashion for millennials\", \"intent\": \"informational\"},\n    {\"keyword\": \"how to build a sustainable wardrobe\", \"intent\": \"informational\"},\n    {\"keyword\": \"fashion brands using organic materials\", \"intent\": \"informational\"},\n    {\"keyword\": \"affordable eco-friendly clothing options\", \"intent\": \"transactional\"},\n    {\"keyword\": \"where to buy organic cotton clothing\", \"intent\": \"transactional\"},\n    {\"keyword\": \"impact of fast fashion\", \"intent\": \"informational\"},\n    {\"keyword\": \"eco-friendly fashion tips\", \"intent\": \"informational\"},\n    {\"keyword\": \"sustainable fashion shopping guide\", \"intent\": \"informational\"},\n    {\"keyword\": \"best sustainable clothing sites\", \"intent\": \"navigational\"},\n    {\"keyword\": \"eco-friendly clothing for men\", \"intent\": \"informational\"},\n    {\"keyword\": \"ethical fashion certifications\", \"intent\": \"informational\"}\n]\n```"

const generate = async (req, res) => {
    const { promptType } = req?.body

    const prompt = (type) => {
        switch (type) {
            case "KEYWORD":
                return keywordSuggestion(req?.body)
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

        // const resp = await axios.post(process.env.OPENAI_BASE_URL, payload, {
        //     headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }
        // });
        // const text = resp.data.output?.[0]?.content?.[0]?.text || "";

        return mockData

    } catch (error) {
        throw error
    }
}

module.exports = { generate }