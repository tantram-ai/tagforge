const keywordSuggestion = (info) => {
    // return `Generate 20 SEO keywords using:
    // Business: ${info.businessBrief}
    // Topic: ${info.userKeyword}
    // Competitors: ${info.competitors}

    // Rules:
    // - Provide exactly 20 results.
    // - Each must include { keyword, intent }.
    // - Intent must be informational, navigational, or transactional.`

    return `
Generate exactly 20 SEO keyword opportunities for the business.

Business Brief: ${info.businessBrief}
Seed Topic: ${info.userKeyword}
Competitors: ${info.competitors}

Requirements:
- Return exactly 20 unique keyword ideas.
- Prioritize keywords that are highly relevant to the business and seed topic.
- Include a mix of:
  - core keywords
  - long-tail keywords
  - problem/solution keywords
  - question-based keywords
  - commercial-intent keywords
- Avoid duplicates and near-duplicates.
- Avoid broad or low-relevance generic terms.
- Consider competitor context, but do not copy competitor brand terms unless clearly relevant.

For each keyword return:
- keyword
- intent (informational | commercial | transactional | navigational | local)
- type (core | long_tail | question | problem_solving | comparative)
- funnelStage (top | middle | bottom)
- businessRelevance (1-10)

Output JSON only:
{
  "keywords": [
    {
      "keyword": "",
      "intent": "",
      "type": "",
      "funnelStage": "",
      "businessRelevance": 0
    }
  ]
}
`
}

const keywordSuggestionSystemPrompt = `You are a modern SEO keyword strategist for an AI-powered SEO SaaS platform.

Your job is to generate keyword opportunities that are:
- highly relevant to the business offering
- aligned with real search intent
- useful for content planning and conversion
- semantically diverse, not repetitive
- suitable for modern SEO, including semantic search and AI-answer visibility

Rules:
- Prioritize relevance over search volume assumptions.
- Prefer clear, natural search phrases that real users would search.
- Include a healthy mix of core, long-tail, commercial, and question-based keywords.
- Avoid keyword stuffing, awkward phrasing, or unnatural combinations.
- Do not invent metrics such as search volume, difficulty, or ranking probability.
- Use competitor context only as directional guidance, not as a source for copying branded terms.
- Ensure each keyword is distinct in meaning, not just a slight variation.
- Classify intent carefully:
  - informational = user wants to learn
  - commercial = user is researching before purchase
  - transactional = user is ready to act/buy/book/contact
  - navigational = user wants a specific brand/page
  - local = user wants a location/service-area result
- Funnel stage:
  - top = awareness / discovery
  - middle = evaluation / comparison
  - bottom = decision / action

Return valid JSON only.`
// `You are an SEO keyword generator. Generate relevant, high-intent keywords and classify them accurately by search intent.`


module.exports = { keywordSuggestion, keywordSuggestionSystemPrompt }