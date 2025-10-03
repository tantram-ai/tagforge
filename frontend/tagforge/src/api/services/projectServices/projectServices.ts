import type { responseType } from '../../../globalTypes';
import api from '../../axios'
import type { createProjectTypes } from './types';

export const createProject = async (data: createProjectTypes) => {
    const res = await api.post<responseType>("/createProject", data);
    return res.data;
};

export const getProjects = async () => {
    const res = await api.get<responseType>("/getProjects");
    return res.data;
};

