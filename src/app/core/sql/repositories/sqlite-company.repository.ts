import { inject } from '@angular/core';
import { DatabaseService } from '@core/services/database.service';
import type { CompanyInterface } from '@shared/interfaces/company';
import type { Database } from 'sql.js';
import type { CompanyRepository } from './company.repository';

export class SQLiteCompanyRepository implements CompanyRepository {
  private _dbService = inject(DatabaseService);
  private _db: Database = this._dbService.getDb() as Database;

  public async add(company: CompanyInterface): Promise<CompanyInterface> {
    const stmt = this._db.prepare(
      'INSERT INTO company (companyName, cnpj, address, contacts) VALUES (?, ?, ?, ?)'
    );
    stmt.run([company.companyName, company.cnpj, company.address, '']);
    stmt.free();

    const id = this._db.exec('SELECT last_insert_rowid() AS id')[0]
      .values[0][0] as number;

    return {
      ...company,
      id,
    };
  }

  public async getAll(): Promise<CompanyInterface[]> {
    const result = this._db.exec('SELECT * FROM company');

    if (!result.length) {
      return [];
    }

    return result[0]?.values?.map((row) => {
      return {
        id: row[0] as number,
        companyName: row[1] as string,
        cnpj: row[2] as string,
        address: row[3] as string,
        contact: null,
      };
    });
  }

  public async getById(id: number): Promise<CompanyInterface | undefined> {
    const result = this._db.exec(`SELECT * FROM company WHERE id = ${id}`);
    return result[0].values.map((row) => ({
      id: row[0] as number,
      companyName: row[1] as string,
      cnpj: row[2] as string,
      address: row[3] as string,
      contact: null,
    }))[0];
  }

  public async update(id: number, company: CompanyInterface): Promise<void> {
    this._db.exec(
      `UPDATE company SET companyName = '${company.companyName}', cnpj = '${
        company.cnpj
      }', address = '${company.address}', contacts = '${JSON.stringify(
        company.contact
      )}' WHERE id = ${id}`
    );
  }

  public async delete(id: number): Promise<void> {
    this._db.exec(`DELETE FROM company WHERE id = ${id}`);
  }
}
