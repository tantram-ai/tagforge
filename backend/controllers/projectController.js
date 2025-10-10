const { validateProjectLimit } = require("../middlewares");
const { projects } = require("../models");
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
        const projectsData = await projects.findAll({ where: { uid }, raw: true })
        if (projectsData?.length > 0) {
            return fetchSuccess(res, projectsData)
        }
    } catch (error) {
        return internalServer(error, res)
    }

}


module.exports = { createProject, getProjectList }