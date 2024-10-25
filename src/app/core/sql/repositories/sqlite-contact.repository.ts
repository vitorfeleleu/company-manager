// src/app/modules/company/services/company.service.ts
import { inject } from '@angular/core';
import { DatabaseService } from '@core/services/database.service';
import type { ContactInterface } from '@shared/interfaces/contact';
import type { Database } from 'sql.js';
import type { ContactRepository } from './contact.repository';

export class SQLiteContactRepository implements ContactRepository {
  private _dbService = inject(DatabaseService);
  private _db: Database = this._dbService.getDb() as Database;

  public async add(
    companyId: number,
    contact: ContactInterface
  ): Promise<ContactInterface> {
    const stmt = this._db.prepare(
      'INSERT INTO contact (company_id, email, phone, telephone) VALUES (?, ?, ?, ?)'
    );
    stmt.run([companyId, contact.email, contact.phone, contact.telephone]);
    stmt.free();

    return contact;
  }

  public async getById(id: number): Promise<ContactInterface | undefined> {
    const result = this._db.exec(`SELECT * FROM contact WHERE id = ${id}`);
    return result[0].values.map((row) => ({
      id: row[0] as number,
      email: row[1] as string,
      phone: row[2] as string,
      telephone: row[3] as string,
    }))[0];
  }

  public async getByCompanyId(
    id: number
  ): Promise<ContactInterface | undefined> {
    const result = this._db.exec(
      `SELECT * FROM contact WHERE company_id = ${id}`
    );
    return result[0].values.map((row) => ({
      id: row[0] as number,
      email: row[1] as string,
      phone: row[2] as string,
      telephone: row[3] as string,
    }))[0];
  }

  public async update(id: number, company: ContactInterface): Promise<void> {
    this._db.exec(
      `UPDATE contact SET email = '${company.email}', phone = '${company.phone}', telephone = '${company.telephone}' WHERE id = ${id}`
    );
  }

  public async delete(id: number): Promise<void> {
    this._db.exec(`DELETE FROM contact WHERE id = ${id}`);
  }
}
