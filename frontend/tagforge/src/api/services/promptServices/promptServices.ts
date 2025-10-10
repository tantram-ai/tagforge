import api from '../../axios'
import type { responseType } from '../../../globalTypes';
import type { getKeywordsTypes } from './types'


export const getKeywords = async (data: getKeywordsTypes) => {
    const res = await api.post<responseType>("/generateKeywords", data);
    return res.data;
};