import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date) // Transform the input value into a date object.
  endDate: Date;

  @IsString()
  @IsNotEmpty() // Checks if given value is not empty (!== '', !== null, !== undefined).
  placeId: string;

  @IsString()
  @IsNotEmpty()
  invoiceId: string;
}
