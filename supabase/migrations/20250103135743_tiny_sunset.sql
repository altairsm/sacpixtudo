/*
  # Initial Schema Setup

  1. New Tables
    - `system_owners`
      - Primary admin account for the system
      - Can manage client companies
    - `client_companies`
      - Companies that use the system
      - Managed by system owners
    - `company_users`
      - Users belonging to client companies
      - Can manage housekeepers
    - `housekeepers`
      - Housekeepers managed by company users
    
  2. Security
    - Enable RLS on all tables
    - Add policies for proper access control
*/

-- System Owners table
CREATE TABLE IF NOT EXISTS system_owners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  cpf text UNIQUE NOT NULL,
  company_name text NOT NULL,
  cnpj text UNIQUE NOT NULL,
  pix_key text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Client Companies table
CREATE TABLE IF NOT EXISTS client_companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  responsible_cpf text UNIQUE NOT NULL,
  cnpj text UNIQUE NOT NULL,
  company_name text NOT NULL,
  pix_key text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES system_owners(id)
);

-- Company Users table
CREATE TABLE IF NOT EXISTS company_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  cpf text UNIQUE NOT NULL,
  company_id uuid REFERENCES client_companies(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Housekeepers table
CREATE TABLE IF NOT EXISTS housekeepers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  cpf text UNIQUE NOT NULL,
  pix_key text NOT NULL,
  created_by uuid REFERENCES company_users(id),
  company_id uuid REFERENCES client_companies(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  active boolean DEFAULT true
);

-- Enable Row Level Security
ALTER TABLE system_owners ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE housekeepers ENABLE ROW LEVEL SECURITY;

-- System Owners Policies
CREATE POLICY "System owners can read their own data"
  ON system_owners
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Client Companies Policies
CREATE POLICY "System owners can manage client companies"
  ON client_companies
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM system_owners));

CREATE POLICY "Companies can read their own data"
  ON client_companies
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Company Users Policies
CREATE POLICY "Companies can manage their users"
  ON company_users
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (
    SELECT id FROM client_companies WHERE id = company_id
  ));

CREATE POLICY "Users can read their own data"
  ON company_users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Housekeepers Policies
CREATE POLICY "Company users can manage housekeepers"
  ON housekeepers
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM company_users WHERE company_id = housekeepers.company_id
    )
  );

-- Function to check if system owner exists
CREATE OR REPLACE FUNCTION check_system_owner_exists()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (SELECT 1 FROM system_owners LIMIT 1);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;