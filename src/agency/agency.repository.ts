import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../common/repositories/base.repository';
import { Agency } from './agency.entity';

@Injectable()
export class AgencyRepository extends BaseRepository<Agency> {
  constructor(
    @InjectRepository(Agency)
    private readonly repository: Repository<Agency>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
