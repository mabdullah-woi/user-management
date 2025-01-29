import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../common/repositories/base.repository';
import { Event } from './event.entity';

@Injectable()
export class EventRepository extends BaseRepository<Event> {
  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
