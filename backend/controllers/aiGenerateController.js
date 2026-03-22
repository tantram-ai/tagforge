const { keywordSuggestion,
    contentPrompt,
    seoContentFunction,
    keywordFunction,
    keywordSchema,
    // handleKeywordsResponse,
    seoContentSchema,
    keywordSuggestionSystemPrompt,
    contentSystemPrompt,
    parseOpenAIResponse } = require("../utils");
const OpenAI = require("openai");

const generate = async (req, res) => {
    const { promptType } = req?.body
    const plan = req?.subsciptionData?.data?.Plan?.dataValues

    const client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        baseURL: process.env.OPENAI_BASE_URL
    });

    const promptInfo = (type) => {
        switch (type) {
            case "KEYWORD":
                return {
                    prompt: keywordSuggestion(req?.body),
                    contentFunction: keywordFunction,
                    system: keywordSuggestionSystemPrompt,
                    name: "keywords_response",
                    schema: keywordSchema
                }
            case "CONTENT":
                return {
                    prompt: contentPrompt(req?.body, plan),
                    contentFunction: seoContentFunction,
                    system: contentSystemPrompt,
                    name: "seo_content_response",
                    schema: seoContentSchema
                }
            default:
                return "";
        }
    }

    try {
        const { prompt, contentFunction, system, name, schema } = promptInfo(promptType)
        const completion = await client.responses.create({
            model: process.env.GPT_MODEL || "gpt-4.1-mini",
            input: [
                { role: "system", content: system },
                { role: "user", content: prompt },
            ],
            text: {
                format: {
                    type: "json_schema",
                    name: name,
                    schema: schema,
                    strict: true,
                },
            },
            tools: [contentFunction],
        });
        const result = parseOpenAIResponse(completion)

        return result

    } catch (error) {
        throw error
    }
}

module.exports = { generate }