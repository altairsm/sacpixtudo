import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Diarista } from '../types';

interface Props {
  onSave: (diarista: Omit<Diarista, 'id'>) => void;
}

export function DiaristaCadastro({ onSave }: Props) {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    cpf: '',
    valorDiaria: '',
    especialidades: '',
    pixKey: '',
    pixKeyType: 'cpf' as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      valorDiaria: Number(formData.valorDiaria),
      especialidades: formData.especialidades.split(',').map(e => e.trim()),
      ativo: true,
    });
    setFormData({
      nome: '',
      telefone: '',
      cpf: '',
      valorDiaria: '',
      especialidades: '',
      pixKey: '',
      pixKeyType: 'cpf',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Cadastrar Diarista</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.nome}
            onChange={e => setFormData(prev => ({ ...prev, nome: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Telefone</label>
          <input
            type="tel"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.telefone}
            onChange={e => setFormData(prev => ({ ...prev, telefone: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">CPF</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.cpf}
            onChange={e => setFormData(prev => ({ ...prev, cpf: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Valor da Diária</label>
          <input
            type="number"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.valorDiaria}
            onChange={e => setFormData(prev => ({ ...prev, valorDiaria: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo de Chave PIX</label>
          <select
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.pixKeyType}
            onChange={e => setFormData(prev => ({ ...prev, pixKeyType: e.target.value as any }))}
          >
            <option value="cpf">CPF</option>
            <option value="telefone">Telefone</option>
            <option value="email">E-mail</option>
            <option value="aleatoria">Chave Aleatória</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Chave PIX</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.pixKey}
            onChange={e => setFormData(prev => ({ ...prev, pixKey: e.target.value }))}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Especialidades (separadas por vírgula)</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.especialidades}
            onChange={e => setFormData(prev => ({ ...prev, especialidades: e.target.value }))}
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Cadastrar Diarista
          </button>
        </div>
      </div>
    </form>
  );
}