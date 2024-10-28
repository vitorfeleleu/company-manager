import type { CompanyInterface } from '@shared/interfaces/company';

export interface CompanyRepository {
  add(item: CompanyInterface): Promise<CompanyInterface>;
  getById(id: number): Promise<CompanyInterface | undefined>;
  getByCnpj(cnpj: string): Promise<CompanyInterface | undefined>;
  getAll(): Promise<CompanyInterface[]>;
  update(id: number, item: CompanyInterface): Promise<void>;
  delete(id: number): Promise<void>;
}
