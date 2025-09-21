import api from '../../axios'
import type { forgotPasswordType, loginTypes, resendVerificationEmailType, resetPasswordTypes, signUpTypes } from './types'
import type { responseType } from '../../../globalTypes';

export const signUp = async (data: signUpTypes) => {
  const res = await api.post<responseType>("/signup", data);
  return res.data;
};

export const login = async (data: loginTypes) => {
  const res = await api.post<responseType>("/login", data);
  return res.data;
};

export const logout = async () => {
  await api.post<responseType>("/logout");
};

export const getProfile = async () => {
  const res = await api.get<responseType>("/getProfile");
  return res.data;
};

export const resendVerificationEmail = async (data: resendVerificationEmailType) => {
  const res = await api.post<responseType>("/resendVerification", data)
  return res.data
}

export const forgotPassword = async (data: forgotPasswordType) => {
  const res = await api.post<responseType>("/forgotPassword", data)
  return res.data
}

export const resetPassword = async (data: resetPasswordTypes) => {
  const res = await api.post<responseType>("/resetPassword", data)
  return res.data
}




