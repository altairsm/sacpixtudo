import React, { useState } from 'react';
import { DiaristaForm } from './DiaristaForm';
import { DiaristaList } from './DiaristaList';
import { Diarista } from '../../types';

interface Props {
  diaristas: Diarista[];
  onSave: (diarista: Omit<Diarista, 'id'> & { id?: string }) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export function DiaristaManager({ diaristas, onSave, onDelete, onToggleStatus }: Props) {
  const [editingDiarista, setEditingDiarista] = useState<Diarista | undefined>();

  const handleEdit = (diarista: Diarista) => {
    setEditingDiarista(diarista);
  };

  const handleCancelEdit = () => {
    setEditingDiarista(undefined);
  };

  const handleSave = (diarista: Omit<Diarista, 'id'> & { id?: string }) => {
    onSave(diarista);
    setEditingDiarista(undefined);
  };

  return (
    <div className="space-y-8">
      <DiaristaForm
        diaristas={diaristas}
        onSave={handleSave}
        editingDiarista={editingDiarista}
        onCancelEdit={handleCancelEdit}
      />
      <DiaristaList
        diaristas={diaristas}
        onDelete={onDelete}
        onToggleStatus={onToggleStatus}
        onEdit={handleEdit}
      />
    </div>
  );
}