import api from '../../axios'
import type { loginTypes, signUpTypes } from './types'
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



