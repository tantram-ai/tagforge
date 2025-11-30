const keywordSuggestion = (info) => {
    // return `
    // You are an SEO keyword generator.

    // Input:
    // - Business: ${info.businessBrief}
    // - Topic: ${info.userKeyword}
    // - Competitors: ${info.competitors}

    // Task:
    // Generate exactly 20 high-intent keywords and long-tail queries relevant to the topic and business.

    // Output rules:
    // - Respond ONLY with valid JSON.
    // - No explanation, no markdown, no text outside the JSON.
    // - JSON must be an array of 20 objects.
    // - Each object must follow this structure:
    //   {
    //     "keyword": "string",
    //     "intent": "informational" | "navigational" | "transactional"
    //   }

    // Return ONLY the JSON array. Nothing else.
    // `

    return `Generate 20 SEO keywords using:

    Business: ${info.businessBrief}
    Topic: ${info.userKeyword}
    Competitors: ${info.competitors}

    Rules:
    - Provide exactly 20 results.
    - Each must include { keyword, intent }.
    - Intent must be informational, navigational, or transactional.`
}

const keywordSuggestionSystemPrompt = `You are an SEO keyword generator. Generate relevant, high-intent keywords and classify them accurately by search intent.`

module.exports = { keywordSuggestion, keywordSuggestionSystemPrompt }