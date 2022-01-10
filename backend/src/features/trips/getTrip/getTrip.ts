import { GetTripResponseDTO } from '@s19192/shared';
import { getTripById } from 'features/trips/trips.model';
import { getNumericId } from 'utils/getNumericId';
import { replaceDateWithTimestamp } from 'utils/replaceDateWithString';
import { APIError, withJSON } from 'utils/withJSON/withJSON';

export const getTrip = withJSON<GetTripResponseDTO>()(async (_body, req) => {
  const id = getNumericId(req.params.id);

  if (id === null) {
    throw new APIError('Provided id is invalid', 422);
  }

  const trip = await getTripById(id);

  if (trip === undefined) {
    throw new APIError('Trip not found', 404);
  }

  return {
    trip: replaceDateWithTimestamp(trip),
  };
});
