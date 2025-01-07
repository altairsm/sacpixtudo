import React, { useState } from 'react';
import { DiariaRegistro } from './DiariaRegistro';
import { DiariaLista } from './DiariaLista';
import { Diarista, Diaria, Servico } from '../../types';

interface Props {
  diaristas: Diarista[];
  diarias: Diaria[];
  servicos: Servico[];
  onSave: (diaria: Omit<Diaria, 'id'> & { id?: string }) => void;
  onUpdateStatus: (id: string, status: 'concluida' | 'cancelada') => void;
}

export function DiariaManager({ diaristas, diarias, servicos, onSave, onUpdateStatus }: Props) {
  const [editingDiaria, setEditingDiaria] = useState<Diaria | undefined>();

  const handleEdit = (diaria: Diaria) => {
    setEditingDiaria(diaria);
  };

  const handleCancelEdit = () => {
    setEditingDiaria(undefined);
  };

  const handleSave = (diaria: Omit<Diaria, 'id'> & { id?: string }) => {
    onSave(diaria);
    setEditingDiaria(undefined);
  };

  return (
    <div className="space-y-8">
      <DiariaRegistro
        diaristas={diaristas}
        diarias={diarias}
        servicos={servicos}
        onSave={handleSave}
        editingDiaria={editingDiaria}
        onCancelEdit={handleCancelEdit}
      />
      <DiariaLista
        diarias={diarias}
        diaristas={diaristas}
        servicos={servicos}
        onUpdateStatus={onUpdateStatus}
        onEdit={handleEdit}
      />
    </div>
  );
}