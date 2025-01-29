import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { CreateEventDto } from '../dto/create-event.dto';
import { EventRepository } from '../event.repository';

@Injectable()
export class EventService {
  constructor(private readonly eventRepository: EventRepository) {}

  async findAll() {
    const events = await this.eventRepository.find();

    return { count: events.length, data: events };
  }

  async findOne(id: string) {
    const event = await this.eventRepository.findOne({ where: { id } });

    if (!event) {
      throw new HttpException(`Event not found.`, HttpStatus.NOT_FOUND);
    }

    return { data: event };
  }

  async create(createEventDto: CreateEventDto) {
    const newEvent = this.eventRepository.create({
      id: uuid.v4(),
      ...createEventDto,
    });

    await this.eventRepository.save(newEvent);

    return { data: newEvent };
  }
}
