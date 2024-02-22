import { PartialType } from '@nestjs/mapped-types';
import { CreateReservationDto } from './create-reservation.dto';

// This is a PartialType of CreateReservationDto, which means
// that this Dto will have all the properties of CreateReservationDto
// but all of them will be optional.
// You could also define new properties here (optional or not)
export class UpdateReservationDto extends PartialType(CreateReservationDto) {}
