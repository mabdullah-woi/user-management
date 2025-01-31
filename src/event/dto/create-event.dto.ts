import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID('4')
  agencyId: string;
}
