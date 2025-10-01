const cookieSettings = {
    httpOnly: process.env.HTTP_ONLY === "true",
    secure: process.env.SECURE === "true",
    sameSite: process.env.SAME_SITE || "Lax",
    maxAge:  Number(process.env.MAX_AGE)
}

module.exports = { cookieSettings }