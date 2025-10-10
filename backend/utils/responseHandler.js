const internalServer = (error = null, res) =>{
    return res.status(error?.status || 500).json({
        error: error || "",
        code: "INTERNAL_SERVER",
        message: error?.message || "Internal Server Server",
        data: null
    })
}
const fetchSuccess = (res, data) =>{
    return res.status(200).json({
        error: "",
        code: "SUCCESS",
        message: "Fetched successfully",
        data: data
    })
}
const invelidToken = (res) =>{
    return res.status(401).json({
        error: "",
        code: "NO_TOKEN",
        message: "Invelid / No auth token",
        data: null
    });
}
const verifyEmail = (res, token) =>{
    return res.status(403).json({
        error: "",
        code: "VERIFY_EMAIL",
        message: "Please verify your email first",
        data: { token }
    })
}

const customError = (res, code, message) =>{
    return res.status(400).json({
        error: "customError",
        code: code,
        message: message,
        data: null
    })
}
const successWithMessage = (res, message, data = null) =>{
   return res.status(200).json({
        error: "",
        code: "SUCCESS",
        message: message,
        data: data
    })
}
module.exports = {
    internalServer,
    fetchSuccess,
    invelidToken,
    verifyEmail,
    successWithMessage,
    customError
}