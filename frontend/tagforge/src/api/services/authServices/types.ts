
export type signUpTypes = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

export type loginTypes = {
    email: string,
    password: string
}

export type resendVerificationEmailType = {
    email: string,
    password: string
}

export type forgotPasswordType = {
    email: string,
}

export type resetPasswordTypes = {
    oobCode: string,
    newPassword: string
}