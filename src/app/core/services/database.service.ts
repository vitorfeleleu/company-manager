import { Injectable } from '@angular/core';
import initSqlJs, { type Database } from 'sql.js';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private _db: Database | null = null;

  public async initializeDatabase(): Promise<void> {
    const config = {
      locateFile: (file: string) => `assets/${file}`,
    };

    try {
      const sql = await initSqlJs(config);
      this._db = new sql.Database();
      this.createTables(this._db);
    } catch (error) {
      console.error('Failed to load SQL.js', error);
    }
  }

  public getDb(): Database | null {
    return this._db;
  }

  private createTables(db: Database) {
    this._createTableCompany(db);
    this._createTableContact(db);
  }

  private _createTableCompany(db: Database) {
    db.run(`
      CREATE TABLE IF NOT EXISTS company (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        companyName TEXT NOT NULL,
        cnpj TEXT NOT NULL UNIQUE,
        address TEXT NOT NULL,
        contacts TEXT NOT NULL
      );
    `);
  }

  private _createTableContact(db: Database) {
    db.run(`
        CREATE TABLE IF NOT EXISTS contact (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT NOT NULL,
          phone TEXT,
          telephone TEXT,
          company_id INTEGER,
          FOREIGN KEY(company_id) REFERENCES company(id)
        );
    `);
  }
}
