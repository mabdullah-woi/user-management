import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventController } from './controllers/event.controller';
import { Event } from './event.entity';
import { EventRepository } from './event.repository';
import { EventService } from './services/event.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  controllers: [EventController],
  providers: [EventRepository, EventService],
})
export class EventModule {}
