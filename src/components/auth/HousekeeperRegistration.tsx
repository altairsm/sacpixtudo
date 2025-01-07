import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';

export function HousekeeperRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    cpf: '',
    pixKey: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Get current user (company user)
      const { data: { user } } = await supabase.auth.getUser();
      
      // Get company ID
      const { data: companyUser } = await supabase
        .from('company_users')
        .select('company_id')
        .eq('id', user!.id)
        .single();

      // Create housekeeper record
      const { error: housekeeperError } = await supabase
        .from('housekeepers')
        .insert({
          name: formData.name,
          phone: formData.phone,
          cpf: formData.cpf,
          pix_key: formData.pixKey,
          created_by: user!.id,
          company_id: companyUser!.company_id,
          active: true,
        });

      if (housekeeperError) throw housekeeperError;

      // Clear form
      setFormData({
        name: '',
        phone: '',
        cpf: '',
        pixKey: '',
      });

    } catch (error) {
      console.error('Error creating housekeeper:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Cadastro de Diarista
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Cadastre um novo diarista
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Nome Completo"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <input
                type="tel"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Telefone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            <div>
              <input
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="CPF"
                value={formData.cpf}
                onChange={(e) => setFormData(prev => ({ ...prev, cpf: e.target.value }))}
              />
            </div>
            <div>
              <input
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Chave PIX"
                value={formData.pixKey}
                onChange={(e) => setFormData(prev => ({ ...prev, pixKey: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cadastrar Diarista
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}