const { contentPrompt } = require("./DynamicPrompts/contentPrompt");
const { keywordSuggestion } = require("./DynamicPrompts/keywordSuggestion");
const { cookieSettings } = require("./cookieSettings");
const { internalServer,
    fetchSuccess,
    invelidToken,
    verifyEmail,
    successWithMessage,
    customError } = require("./responseHandler");
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
    contentPrompt
}