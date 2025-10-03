const { keywordSuggestion } = require("../utils");

const generate = async (req, res) => {
    const { prompType } = req?.body

    const prompt = (type) => {
        switch (type) {
            case "KEYWORD":
                return keywordSuggestion(req?.body)
            default:
                return "";
        }
    }

    try {
        const model = process.env.FREE_MODEL || 'gpt-4o-mini';
        const payload = {
            model,
            input: prompt(prompType),
        };

        const resp = await axios.post(process.env.OPENAI_BASE_URL, payload, {
            headers: { Authorization: `Bearer ${process.env.OPENAI_KEY}` }
        });
        return res.status(200).json({ error: "", code: "SUCCESS", message: "Fetched successfully", data:resp?.data?.output })

    } catch (error) {

    }
}

module.exports = { generate }