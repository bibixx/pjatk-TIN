import { withJSON } from 'utils/withJSON/withJSON';
import {
  CreateTripRequestDTO,
  CreateTripResponseDTO,
  TripTable,
} from '@s19192/shared';
import { replaceDateWithTimestamp } from 'utils/replaceDateWithString';
import { tripValidator } from '../trips.validators';
import { createTrip as createTripModel } from '../trips.model';

export const createTrip = withJSON<CreateTripResponseDTO, CreateTripRequestDTO>(
  tripValidator,
)(async (trip) => {
  const [newTrip] = await createTripModel(trip);

  return {
    trip: replaceDateWithTimestamp(newTrip as TripTable),
  };
});
