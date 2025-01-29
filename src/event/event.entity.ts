import { Column, Entity } from 'typeorm';

@Entity({ name: 'event' })
export class Event {
  @Column({ name: 'id', primary: true, type: 'uuid' })
  id: string;

  @Column()
  name: string;
}
