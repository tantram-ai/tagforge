const cookieSettings = {
    httpOnly: process.env.HTTP_ONLY === "true",
    secure: process.env.SECURE === "true",
    sameSite: process.env.SAME_SITE || "Lax",
    // maxAge: Number(process.env.MAX_AGE_DAY) * 24 * 60 * 60 * 1000
    maxAge:3600000
}

module.exports = { cookieSettings }