import api from '../../axios'
import type { responseType } from '../../../globalTypes';
import type { generateContentTypes, getKeywordsTypes } from './types'


export const getKeywords = async (data: getKeywordsTypes) => {
    const res = await api.post<responseType>("/generateKeywords", data);
    return res.data;
};

export const generateContent = async (data: generateContentTypes) => {
    const res = await api.post<responseType>("/generateContent", data);
    return res.data;
};