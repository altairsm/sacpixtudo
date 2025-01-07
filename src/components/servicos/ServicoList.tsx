import React from 'react';
import { Trash2, CheckCircle, XCircle } from 'lucide-react';
import { Servico } from '../../types';
import { validation } from '../../utils/validation';

interface Props {
  servicos: Servico[];
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export function ServicoList({ servicos, onDelete, onToggleStatus }: Props) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serviço</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Base</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {servicos.map((servico) => (
            <tr key={servico.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{servico.nome}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-500">{servico.descricao}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {validation.formatCurrency(servico.valorBase)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  servico.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {servico.ativo ? 'Ativo' : 'Inativo'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => onToggleStatus(servico.id)}
                  className="text-blue-600 hover:text-blue-900 mr-4"
                  title={servico.ativo ? 'Desativar' : 'Ativar'}
                >
                  {servico.ativo ? <XCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => onDelete(servico.id)}
                  className="text-red-600 hover:text-red-900"
                  title="Excluir"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}