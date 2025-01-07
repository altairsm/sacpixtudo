import React, { useState, useEffect } from 'react';
import { PlusCircle, Save } from 'lucide-react';
import { Diarista } from '../../types';
import { validation } from '../../utils/validation';

interface Props {
  diaristas: Diarista[];
  onSave: (diarista: Omit<Diarista, 'id'> & { id?: string }) => void;
  editingDiarista?: Diarista;
  onCancelEdit?: () => void;
}

export function DiaristaForm({ diaristas, onSave, editingDiarista, onCancelEdit }: Props) {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    cpf: '',
    especialidades: '',
    pixKey: '',
    pixKeyType: 'cpf' as const,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editingDiarista) {
      setFormData({
        ...editingDiarista,
        especialidades: editingDiarista.especialidades.join(', '),
      });
    }
  }, [editingDiarista]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanCPF = formData.cpf.replace(/\D/g, '');
    
    if (!validation.validateCPF(cleanCPF)) {
      setError('CPF inválido');
      return;
    }

    // Only check for unique CPF if it's a new diarist or if the CPF has changed
    if (!editingDiarista || editingDiarista.cpf !== formData.cpf) {
      if (!validation.isCPFUnique(cleanCPF, diaristas)) {
        setError('CPF já cadastrado');
        return;
      }
    }

    onSave({
      ...formData,
      id: editingDiarista?.id,
      cpf: validation.formatCPF(cleanCPF),
      especialidades: formData.especialidades.split(',').map(e => e.trim()),
      ativo: editingDiarista ? editingDiarista.ativo : true,
    });

    if (!editingDiarista) {
      setFormData({
        nome: '',
        telefone: '',
        cpf: '',
        especialidades: '',
        pixKey: '',
        pixKeyType: 'cpf',
      });
    }
  };

  const handleCPFChange = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    const formattedValue = validation.formatCPF(cleanValue);
    setFormData(prev => ({ ...prev, cpf: formattedValue }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {editingDiarista ? 'Editar Diarista' : 'Cadastrar Diarista'}
      </h2>
      
      {error && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}

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
            maxLength={14}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.cpf}
            onChange={e => handleCPFChange(e.target.value)}
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

        <div className="md:col-span-2 flex space-x-4">
          <button
            type="submit"
            className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {editingDiarista ? (
              <>
                <Save className="w-5 h-5 mr-2" />
                Salvar Alterações
              </>
            ) : (
              <>
                <PlusCircle className="w-5 h-5 mr-2" />
                Cadastrar Diarista
              </>
            )}
          </button>
          {editingDiarista && onCancelEdit && (
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