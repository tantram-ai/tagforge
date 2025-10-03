const { validateProjectLimit } = require("../middlewares");
const { projects } = require("../models")

const createProject = async (req, res) => {
    const uid = req?.firebaseUser?.uid;
    const data = { ...req?.body, uid, status: "draft" }
    try {

        const isProjectLimitValid = await validateProjectLimit(req, res)

        if (isProjectLimitValid) {
            const isProjectCreated = await projects.create(data)
            if (isProjectCreated) {
                return res.status(200).json({
                    error: "",
                    code: "SUCCESS",
                    message: "Project created succesfully",
                    data: null
                })
            } else {
                return res.status(400).json({
                    error: "Interna servier error",
                    code: "INTERNAL_SERVER",
                    message: "Interna servier error",
                    data: null
                })
            }
        }
    } catch (error) {
        return res.status(400).json({
            error: error,
            code: "INTERNAL_SERVER",
            message: error.message,
            data: null
        })
    }

}

const getProjectList = async (req, res) => {
    const uid = req?.firebaseUser?.uid;
    try {
        const projectsData = await projects.findAll({ where: { uid }, raw: true })
        if (projectsData?.length > 0) {
            return res.status(200).json({
                error: "",
                code: "SUCCESS",
                message: "Projects featched succesfully",
                data: projectsData
            })
        }
    } catch (error) {
        return res.status(400).json({
            error: error,
            code: "INTERNAL_SERVER",
            message: error.message,
            data: null
        })
    }

}


module.exports = { createProject, getProjectList }