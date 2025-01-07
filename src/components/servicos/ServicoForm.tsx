import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Servico } from '../../types';

interface Props {
  onSave: (servico: Omit<Servico, 'id'>) => void;
}

export function ServicoForm({ onSave }: Props) {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    valorBase: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      valorBase: Number(formData.valorBase),
      ativo: true,
    });
    setFormData({ nome: '', descricao: '', valorBase: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Cadastrar Serviço</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome do Serviço</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.nome}
            onChange={e => setFormData(prev => ({ ...prev, nome: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Descrição</label>
          <textarea
            required
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.descricao}
            onChange={e => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Valor Base</label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.valorBase}
            onChange={e => setFormData(prev => ({ ...prev, valorBase: e.target.value }))}
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Cadastrar Serviço
        </button>
      </div>
    </form>
  );
}