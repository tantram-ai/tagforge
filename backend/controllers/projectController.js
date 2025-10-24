const { validateProjectLimit } = require("../middlewares");
const { projects, keywords, inputs, generation } = require("../models");
const { successWithMessage, internalServer, fetchSuccess } = require("../utils");

const createProject = async (req, res) => {
    const uid = req?.firebaseUser?.uid;
    const data = { ...req?.body, uid, status: "draft" }
    try {

        const isProjectLimitValid = await validateProjectLimit(req, res)

        if (isProjectLimitValid) {
            const isProjectCreated = await projects.create(data)
            if (isProjectCreated) {
                return successWithMessage(res, "Project created succesfully")
            }
        }
    } catch (error) {
        return internalServer(error, res)
    }

}

const getProjectList = async (req, res) => {
    const uid = req?.firebaseUser?.uid;
    try {
        const projectData = await projects.findAll({
            where: { uid },
            attribute: ["projectId", "name", "status", "suggestedKwGenerateCount"],
            include: [
                {
                    model: keywords,
                    attributes: ["keywordId", "phrase", "selected", "suggested"],
                },
                {
                    model: inputs,
                    attributes: ["inputId", "businessBrief", "brandName", "pageType", "tone",
                        "length", "goal", "cta", "competitors", "planId"],
                },
                {
                    model: generation,
                    attributes: ["id", "seoContent", "metaHtml"],
                },
            ],
            order: [['createdAt', 'DESC']],
            raw: false,
        })
        if (projectData.length > 0) {
            return fetchSuccess(res, projectData)
        } else {
            return fetchSuccess(res, [])
        }
    } catch (error) {
        return internalServer(error, res)
    }
}




module.exports = { createProject, getProjectList }