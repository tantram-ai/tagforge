// const handleKeywordsResponse = (completion) => {
//     try {

//         // 1️⃣ Handle tool/function calling
//         const toolArgs =
//             completion?.output?.[0]?.tool_calls?.[0]?.function?.arguments;

//         if (toolArgs) {
//             return safeJsonParse(toolArgs);
//         }

//         // 2️⃣ Handle arguments directly inside output
//         const directArgs = completion?.output?.[0]?.arguments;

//         if (directArgs) {
//             return safeJsonParse(directArgs);
//         }

//         // 3️⃣ Handle structured output (Responses API)
//         if (completion?.output_text) {
//             return safeJsonParse(completion.output_text);
//         }

//         // 4️⃣ Handle assistant message text
//         const messageText =
//             completion?.output?.[0]?.content?.[0]?.text;

//         if (messageText) {
//             return safeJsonParse(messageText);
//         }

//         // 5️⃣ Handle legacy text property
//         if (completion?.text) {
//             return safeJsonParse(completion.text);
//         }

//         return null;

//     } catch (err) {
//         console.error("OpenAI response parse error:", err);
//         return null;
//     }
// };

// module.exports = { handleKeywordsResponse };


const safeJsonParse = (data) => {
    if (!data) return null;

    try {
        if (typeof data === "object") return data;
        return JSON.parse(data);
    } catch {
        return data;
    }
};

const parseOpenAIResponse = (response) => {
    try {

        const toolArgs =
            response?.output?.[0]?.tool_calls?.[0]?.function?.arguments;

        if (toolArgs) return safeJsonParse(toolArgs);

        const directArgs = response?.output?.[0]?.arguments;
        if (directArgs) return safeJsonParse(directArgs);

        if (response?.output_text)
            return safeJsonParse(response.output_text);

        const messageText =
            response?.output?.[0]?.content?.[0]?.text;

        if (messageText) return safeJsonParse(messageText);

        if (response?.text)
            return safeJsonParse(response.text);

        return null;

    } catch (error) {
        console.error("OpenAI parse error:", error);
        return null;
    }
};

module.exports = { parseOpenAIResponse };