import api from '../../axios'
import type { responseType } from '../../../globalTypes';

export const getPlans = async () => {
    const res = await api.get<responseType>("/getPlans");
    return res.data;
};

