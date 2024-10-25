import type { ContactInterface } from './contact';

export interface CompanyInterface {
  id: number;
  companyName: string;
  cnpj: string;
  address: string;
  contact: ContactInterface | null;
}
