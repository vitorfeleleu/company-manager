import type { ContactInterface } from '@shared/interfaces/contact';

export interface ContactRepository {
  add(companyId: number, item: ContactInterface): Promise<ContactInterface>;
  getById(id: number): Promise<ContactInterface | undefined>;
  getByCompanyId(id: number): Promise<ContactInterface | undefined>;
  update(id: number, item: ContactInterface): Promise<void>;
  delete(id: number): Promise<void>;
}
