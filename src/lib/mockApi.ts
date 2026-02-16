import type { Application } from '../types/application';
import { mockData } from '../data/mockData';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

let applications = [...mockData];

export const mockApi = {
  getApplications: async (): Promise<Application[]> => {
    await delay(800);
    if (Math.random() < 0.1) {
      throw new Error('Ошибка сети. Попробуйте снова.');
    }
    return applications.map(app => ({ ...app }));
  },

  updateApplication: async (
    id: string,
    data: Partial<Omit<Application, 'id'>>
  ): Promise<Application> => {
    await delay(600);
    if (Math.random() < 0.1) {
      throw new Error('Ошибка при сохранении. Попробуйте снова.');
    }
    const index = applications.findIndex(app => app.id === id);
    if (index === -1) {
      throw new Error('Заявка не найдена');
    }
    applications[index] = { ...applications[index], ...data };
    return { ...applications[index] };
  },
};
