const { projects } = require("../../models");
const { customError } = require("../../utils");

const validateSuggestedKeywordGenLimit = async (req, res) => {
    const planData = req?.subsciptionData?.data;

    const project = await projects.findOne({
        where: {
            projectId: req?.body?.projectId,
        },
        raw: true
    });

    if (project?.suggestedKwGenerateCount >= planData?.Plan?.keywordSuggestionPerProject) {
        customError(res, "KEYWORD_GEN_LIMIT_REACHED", "Keyword generate limit per project reached please upgrade the plan")
        return false
    }
    return true
}

module.exports = { validateSuggestedKeywordGenLimit }