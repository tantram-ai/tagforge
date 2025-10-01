const keywordSuggestion = (info) =>{
    return `You are an SEO strategist.  
    Given the business context: ${info?.business_brief}
    Main topic: ${info?.user_keyword}
    Competitors: ${info?.competitors}
    Generate a list of 20 relevant keywords and long-tail queries that are most likely to rank well.  
    Format response as JSON with keys: keyword, intent (informational/navigational/transactional).
    `
}

module.exports = {keywordSuggestion}