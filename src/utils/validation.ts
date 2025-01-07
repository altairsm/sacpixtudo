import { Diaria, Diarista } from '../types';

export const validation = {
  isDiaristaAvailable: (diarias: Diaria[], diaristaId: string, data: string): boolean => {
    return !diarias.some(
      diaria => 
        diaria.diaristaId === diaristaId && 
        diaria.data === data &&
        diaria.status !== 'cancelada'
    );
  },

  formatCurrency: (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  },

  formatDate: (date: string): string => {
    return new Date(date).toLocaleDateString('pt-BR');
  },

  formatCPF: (cpf: string): string => {
    const cleanCPF = cpf.replace(/\D/g, '');
    return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  },

  validateCPF: (cpf: string): boolean => {
    const cleanCPF = cpf.replace(/\D/g, '');

    if (cleanCPF.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cleanCPF)) return false;

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.substring(10, 11))) return false;

    return true;
  },

  isCPFUnique: (cpf: string, diaristas: Diarista[]): boolean => {
    const cleanCPF = cpf.replace(/\D/g, '');
    return !diaristas.some(diarista => diarista.cpf.replace(/\D/g, '') === cleanCPF);
  }
};