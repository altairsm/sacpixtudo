import React, { useState, useEffect } from 'react';
import { CalendarPlus, Save } from 'lucide-react';
import { Diarista, Diaria, Servico } from '../../types';
import { validation } from '../../utils/validation';

interface Props {
  diaristas: Diarista[];
  diarias: Diaria[];
  servicos: Servico[];
  onSave: (diaria: Omit<Diaria, 'id'> & { id?: string }) => void;
  editingDiaria?: Diaria;
  onCancelEdit?: () => void;
}

export function DiariaRegistro({ diaristas, diarias, servicos, onSave, editingDiaria, onCancelEdit }: Props) {
  const [formData, setFormData] = useState({
    diaristaId: '',
    servicoId: '',
    data: '',
    valorPago: '',
    local: '',
    observacoes: '',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editingDiaria) {
      setFormData({
        ...editingDiaria,
        valorPago: String(editingDiaria.valorPago),
      });
    }
  }, [editingDiaria]);

  const handleServicoChange = (servicoId: string) => {
    const servico = servicos.find(s => s.id === servicoId);
    setFormData(prev => ({
      ...prev,
      servicoId,
      valorPago: servico ? String(servico.valorBase) : '',
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validation.isDiaristaAvailable(diarias, formData.diaristaId, formData.data)) {
      setError('Este diarista já possui uma diária agendada para esta data');
      return;
    }

    onSave({
      ...formData,
      id: editingDiaria?.id,
      valorPago: Number(formData.valorPago),
      status: editingDiaria ? editingDiaria.status : 'agendada',
    });

    if (!editingDiaria) {
      setFormData({
        diaristaId: '',
        servicoId: '',
        data: '',
        valorPago: '',
        local: '',
        observacoes: '',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {editingDiaria ? 'Editar Diária' : 'Registrar Diária'}
      </h2>
      
      {error && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Diarista</label>
          <select
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.diaristaId}
            onChange={e => setFormData(prev => ({ ...prev, diaristaId: e.target.value }))}
            disabled={editingDiaria !== undefined}
          >
            <option value="">Selecione um diarista</option>
            {diaristas.filter(d => d.ativo).map(diarista => (
              <option key={diarista.id} value={diarista.id}>
                {diarista.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Serviço</label>
          <select
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.servicoId}
            onChange={e => handleServicoChange(e.target.value)}
          >
            <option value="">Selecione um serviço</option>
            {servicos.filter(s => s.ativo).map(servico => (
              <option key={servico.id} value={servico.id}>
                {servico.nome} - {validation.formatCurrency(servico.valorBase)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Data</label>
          <input
            type="date"
            required
            min={new Date().toISOString().split('T')[0]}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.data}
            onChange={e => setFormData(prev => ({ ...prev, data: e.target.value }))}
            disabled={editingDiaria !== undefined}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Valor a ser Pago</label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.valorPago}
            onChange={e => setFormData(prev => ({ ...prev, valorPago: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Local</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.local}
            onChange={e => setFormData(prev => ({ ...prev, local: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Observações</label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
            value={formData.observacoes}
            onChange={e => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
          />
        </div>

        <div className="md:col-span-2 flex space-x-4">
          <button
            type="submit"
            className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {editingDiaria ? (
              <>
                <Save className="w-5 h-5 mr-2" />
                Salvar Alterações
              </>
            ) : (
              <>
                <CalendarPlus className="w-5 h-5 mr-2" />
                Registrar Diária
              </>
            )}
          </button>
          {editingDiaria && onCancelEdit && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancelar Edição
            </button>
          )}
        </div>
      </div>
    </form>
  );
}