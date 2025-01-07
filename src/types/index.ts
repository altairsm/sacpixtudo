export interface Diarista {
  id: string;
  nome: string;
  telefone: string;
  cpf: string;
  especialidades: string[];
  ativo: boolean;
  pixKey: string;
  pixKeyType: 'cpf' | 'telefone' | 'email' | 'aleatoria';
}

export interface Servico {
  id: string;
  nome: string;
  descricao: string;
  valorBase: number;
  ativo: boolean;
}

export interface Diaria {
  id: string;
  diaristaId: string;
  servicoId: string;
  data: string;
  valorPago: number;
  local: string;
  observacoes?: string;
  status: 'agendada' | 'concluida' | 'cancelada';
}

export interface User {
  id: string;
  name: string;
  email: string;
}