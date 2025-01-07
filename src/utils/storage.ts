import { Diarista, Diaria, Servico } from '../types';

const DIARISTAS_KEY = 'diaristas';
const DIARIAS_KEY = 'diarias';
const SERVICOS_KEY = 'servicos';

export const storage = {
  getDiaristas: (): Diarista[] => {
    const data = localStorage.getItem(DIARISTAS_KEY);
    return data ? JSON.parse(data) : [];
  },

  setDiaristas: (diaristas: Diarista[]): void => {
    localStorage.setItem(DIARISTAS_KEY, JSON.stringify(diaristas));
  },

  getDiarias: (): Diaria[] => {
    const data = localStorage.getItem(DIARIAS_KEY);
    return data ? JSON.parse(data) : [];
  },

  setDiarias: (diarias: Diaria[]): void => {
    localStorage.setItem(DIARIAS_KEY, JSON.stringify(diarias));
  },

  getServicos: (): Servico[] => {
    const data = localStorage.getItem(SERVICOS_KEY);
    return data ? JSON.parse(data) : [];
  },

  setServicos: (servicos: Servico[]): void => {
    localStorage.setItem(SERVICOS_KEY, JSON.stringify(servicos));
  }
};