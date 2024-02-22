import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DatabaseModule } from '@app/common';
import { ReservationsRepository } from './reservations.repository';
import {
  ReservationDocument,
  ReservationSchema,
} from './models/reservation.schema';
import { ModelDefinition } from '@nestjs/mongoose';

const reservationModel: ModelDefinition = {
  name: ReservationDocument.name,
  schema: ReservationSchema,
};

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([reservationModel])],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
