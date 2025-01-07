import React from 'react';
import { ServicoForm } from './ServicoForm';
import { ServicoList } from './ServicoList';
import { Servico } from '../../types';

interface Props {
  servicos: Servico[];
  onSave: (servico: Omit<Servico, 'id'>) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export function ServicoManager({ servicos, onSave, onDelete, onToggleStatus }: Props) {
  return (
    <div className="space-y-8">
      <ServicoForm onSave={onSave} />
      <ServicoList
        servicos={servicos}
        onDelete={onDelete}
        onToggleStatus={onToggleStatus}
      />
    </div>
  );
}