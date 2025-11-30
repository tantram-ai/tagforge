const { contentPrompt, contentSystemPrompt } = require("./DynamicPrompts/contentPrompt");
const { keywordSuggestion, keywordSuggestionSystemPrompt } = require("./DynamicPrompts/keywordSuggestion");
const { cookieSettings } = require("./cookieSettings");
const { handleKeywordsResponse } = require("./openAiResponseHandler");
const { internalServer,
    fetchSuccess,
    invelidToken,
    verifyEmail,
    successWithMessage,
    customError } = require("./responseHandler");
const { keywordFunction, keywordSchema } = require("./responseSchema/keywordFunction");
const { seoContentFunction, seoContentSchema } = require("./responseSchema/seoContentFunction");
const subscriptionValidator = require("./subscriptionValidator");

module.exports = {
    subscriptionValidator,
    cookieSettings,
    keywordSuggestion,
    internalServer,
    fetchSuccess,
    invelidToken,
    verifyEmail,
    customError,
    successWithMessage,
    contentPrompt,
    keywordFunction,
    seoContentFunction,
    keywordSchema,
    handleKeywordsResponse,
    seoContentSchema,
    contentSystemPrompt,
    keywordSuggestionSystemPrompt
}