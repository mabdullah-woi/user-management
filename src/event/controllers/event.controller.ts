import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CheckAgency } from 'src/common/decorators/abac.decorator';
import { Permissions } from 'src/common/decorators/permission.decorator';
import { RolesGuard } from 'src/user/guards/role.guard';
import { CreateEventDto } from '../dto/create-event.dto';
import { EventService } from '../services/event.service';

@Controller('events')
@UseGuards(RolesGuard)
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  async findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @Post()
  @Permissions('create_event') // Requires 'create_event' permission
  @CheckAgency() // Ensures user belongs to the agency
  async create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }
}
