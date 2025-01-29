import { FindOptionsRelations, Repository } from 'typeorm';

export abstract class BaseRepository<T> extends Repository<T> {
  async findByField<K extends keyof T>(
    field: K,
    value: T[K],
    relations?: FindOptionsRelations<T>,
  ): Promise<T | null> {
    return this.findOne({
      where: { [field]: value } as any,
      relations,
    });
  }
}
