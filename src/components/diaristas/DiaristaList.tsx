import React from 'react';
import { Trash2, CheckCircle, XCircle, Edit } from 'lucide-react';
import { Diarista } from '../../types';

interface Props {
  diaristas: Diarista[];
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onEdit: (diarista: Diarista) => void;
}

export function DiaristaList({ diaristas, onDelete, onToggleStatus, onEdit }: Props) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contato</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Especialidades</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PIX</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {diaristas.map((diarista) => (
            <tr key={diarista.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{diarista.nome}</div>
                <div className="text-sm text-gray-500">{diarista.cpf}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {diarista.telefone}
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">
                  {diarista.especialidades.join(', ')}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{diarista.pixKeyType}</div>
                <div className="text-sm text-gray-500">{diarista.pixKey}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  diarista.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {diarista.ativo ? 'Ativo' : 'Inativo'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => onEdit(diarista)}
                  className="text-blue-600 hover:text-blue-900 mr-4"
                  title="Editar"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onToggleStatus(diarista.id)}
                  className="text-blue-600 hover:text-blue-900 mr-4"
                  title={diarista.ativo ? 'Desativar' : 'Ativar'}
                >
                  {diarista.ativo ? <XCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => onDelete(diarista.id)}
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