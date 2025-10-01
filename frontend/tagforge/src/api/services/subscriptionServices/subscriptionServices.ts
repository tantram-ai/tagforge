import api from '../../axios'
import type { responseType } from '../../../globalTypes';
import type { buyPlanType } from './types';

export const getPlans = async () => {
    const res = await api.get<responseType>("/getPlans");
    return res.data;
};

export const buyPlan = async (data: buyPlanType) => {
    const res = await api.post<responseType>("/buyPlan", data);
    return res.data;
};



