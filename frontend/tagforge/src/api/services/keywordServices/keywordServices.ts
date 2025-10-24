import type { responseType } from '../../../globalTypes';
import api from '../../axios'
import type { keywordSearchTypes } from './types';


export const keywordSearch = async (data: keywordSearchTypes) => {
    const res = await api.post<responseType>("/getKeywordsWithStats", data);
    return res.data;
};


