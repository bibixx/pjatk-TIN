import {
  TripTable,
  UpdateTripRequestDTO,
  UpdateTripResponseDTO,
} from '@s19192/shared';
import { getNumericId } from 'utils/getNumericId';
import { replaceDateWithTimestamp } from 'utils/replaceDateWithString';
import { APIError, withJSON } from 'utils/withJSON/withJSON';
import { getTripById, updateTrip as updateTripModel } from '../trips.model';
import { tripValidator } from '../trips.validators';

export const updateTrip = withJSON<UpdateTripResponseDTO, UpdateTripRequestDTO>(
  tripValidator,
)(async (trip, req) => {
  const id = getNumericId(req.params.id);

  if (id === null) {
    throw new APIError('Provided id is invalid', 422);
  }

  const oldTrip = await getTripById(id);

  if (oldTrip === undefined) {
    throw new APIError('Trip not found', 404);
  }

  const [updatedTrip] = await updateTripModel(id, trip);

  return {
    trip: replaceDateWithTimestamp(updatedTrip as TripTable),
  };
});
