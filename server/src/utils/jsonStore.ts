import fs from 'fs';
import path from 'path';

const DATA_DIR = path.resolve(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export class JsonStore<T extends { _id?: string; createdAt?: any }> {
  private filePath: string;

  constructor(filename: string) {
    this.filePath = path.join(DATA_DIR, `${filename}.json`);
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([], null, 2), 'utf-8');
    }
  }

  private read(): T[] {
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(data) || [];
    } catch {
      return [];
    }
  }

  private write(data: T[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  async find(filterFn?: (item: T) => boolean): Promise<T[]> {
    const all = this.read();
    if (!filterFn) return all;
    return all.filter(filterFn);
  }

  async findOne(filterFn: (item: T) => boolean): Promise<T | null> {
    const all = this.read();
    return all.find(filterFn) || null;
  }

  async create(item: T): Promise<T> {
    const all = this.read();
    const newItem: any = {
      ...item,
      _id: item._id || 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    all.push(newItem);
    this.write(all);
    return newItem;
  }

  async findByIdAndUpdate(id: string, updates: Partial<T>): Promise<T | null> {
    const all = this.read();
    const index = all.findIndex((i: any) => i._id === id);
    if (index === -1) return null;
    const updated = { ...all[index], ...updates, updatedAt: new Date().toISOString() };
    all[index] = updated;
    this.write(all);
    return updated;
  }

  async findByIdAndDelete(id: string): Promise<boolean> {
    const all = this.read();
    const filtered = all.filter((i: any) => i._id !== id);
    if (filtered.length === all.length) return false;
    this.write(filtered);
    return true;
  }
}
