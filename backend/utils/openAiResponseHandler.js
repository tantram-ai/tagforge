const handleKeywordsResponse = (completion) => {
    try {
        // Case 1: tool_calls exists (preferred)
        if (completion.output?.[0]?.tool_calls?.length > 0) {
            const toolCall = completion.output[0].tool_calls[0];
            return toolCall.function.arguments || {};
        }

        // Case 2: arguments is directly in output[0], parse it
        if (completion.output?.[0]?.arguments) {
            return completion.output[0].arguments || {};
        }

        // Case 3: fallback to parsing text property
        if (completion.text) {
            return completion.text || [];
        }

        return [];
    } catch (err) {
        console.error("Parse error:", err);
        return [];
    }
};

module.exports = { handleKeywordsResponse }