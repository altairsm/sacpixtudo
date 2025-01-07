import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Diaria, Diarista, Servico } from '../types';
import { validation } from '../utils/validation';

interface Props {
  diarias: Diaria[];
  diaristas: Diarista[];
  servicos: Servico[];
  onUpdateStatus: (id: string, status: 'concluida' | 'cancelada') => void;
}

export function DiariaLista({ diarias, diaristas, servicos, onUpdateStatus }: Props) {
  const getDiarista = (id: string) => diaristas.find(d => d.id === id);
  const getServico = (id: string) => servicos.find(s => s.id === id);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diarista</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serviço</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Local</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {diarias.map((diaria) => {
            const diarista = getDiarista(diaria.diaristaId);
            const servico = getServico(diaria.servicoId);
            return (
              <tr key={diaria.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {validation.formatDate(diaria.data)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{diarista?.nome}</div>
                  <div className="text-sm text-gray-500">
                    PIX: {diarista?.pixKeyType} - {diarista?.pixKey}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{servico?.nome}</div>
                  <div className="text-sm text-gray-500">{servico?.descricao}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {diaria.local}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {validation.formatCurrency(diaria.valorPago)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    diaria.status === 'concluida' ? 'bg-green-100 text-green-800' :
                    diaria.status === 'cancelada' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {diaria.status.charAt(0).toUpperCase() + diaria.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {diaria.status === 'agendada' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onUpdateStatus(diaria.id, 'concluida')}
                        className="text-green-600 hover:text-green-900"
                        title="Marcar como concluída"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => onUpdateStatus(diaria.id, 'cancelada')}
                        className="text-red-600 hover:text-red-900"
                        title="Cancelar diária"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}