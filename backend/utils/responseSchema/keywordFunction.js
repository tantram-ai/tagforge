const keywordFunction = {
    type: "function",
    name: "generate_keywords",
    description: "Generate 20 SEO keywords with search intent.",
    parameters: {
        type: "object",
        properties: {
            keywords: {
                type: "array",
                description: "A list of 20 keywords with intent classification.",
                items: {
                    type: "object",
                    properties: {
                        keyword: {
                            type: "string",
                            description: "A high-intent keyword or long-tail query."
                        },
                        intent: {
                            type: "string",
                            enum: ["informational", "navigational", "transactional"],
                            description: "The search intent classification."
                        }
                    },
                    required: ["keyword", "intent"],
                    additionalProperties: false
                },
                minItems: 20,
                maxItems: 20
            }
        },
        required: ["keywords"],
        additionalProperties: false
    }
};

const keywordSchema = {
    type: "object",
    properties: {
      keywords: {
        type: "array",
        items: {
          type: "object",
          properties: {
            keyword: { type: "string" },
            intent: { 
              type: "string",
              enum: ["informational", "navigational", "transactional"]
            }
          },
          required: ["keyword", "intent"],
          additionalProperties: false 
        },
        minItems: 20,
        maxItems: 20
      }
    },
    required: ["keywords"],
    additionalProperties: false
  }


module.exports = { keywordFunction, keywordSchema }