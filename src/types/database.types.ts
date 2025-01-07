export interface SystemOwner {
  id: string;
  name: string;
  email: string;
  cpf: string;
  company_name: string;
  cnpj: string;
  pix_key: string;
  created_at: string;
  updated_at: string;
}

export interface ClientCompany {
  id: string;
  name: string;
  email: string;
  responsible_cpf: string;
  cnpj: string;
  company_name: string;
  pix_key: string;
  created_at: string;
  updated_at: string;
  created_by: string;
}

export interface CompanyUser {
  id: string;
  name: string;
  email: string;
  cpf: string;
  company_id: string;
  created_at: string;
  updated_at: string;
}

export interface Housekeeper {
  id: string;
  name: string;
  phone: string;
  cpf: string;
  pix_key: string;
  created_by: string;
  company_id: string;
  created_at: string;
  updated_at: string;
  active: boolean;
}

export interface Database {
  public: {
    Tables: {
      system_owners: {
        Row: SystemOwner;
        Insert: Omit<SystemOwner, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<SystemOwner, 'id'>>;
      };
      client_companies: {
        Row: ClientCompany;
        Insert: Omit<ClientCompany, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<ClientCompany, 'id'>>;
      };
      company_users: {
        Row: CompanyUser;
        Insert: Omit<CompanyUser, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<CompanyUser, 'id'>>;
      };
      housekeepers: {
        Row: Housekeeper;
        Insert: Omit<Housekeeper, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Housekeeper, 'id'>>;
      };
    };
    Functions: {
      check_system_owner_exists: {
        Args: Record<string, never>;
        Returns: boolean;
      };
    };
  };
}