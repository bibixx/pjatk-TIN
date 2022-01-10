import { DeleteTripResponseDTO } from '@s19192/shared';
import { db } from 'core/db';
import { deleteTripParticipantsByTripId } from 'features/tripParticipants/tripParticipants.model';
import { getNumericId } from 'utils/getNumericId';
import { APIError, withJSON } from 'utils/withJSON/withJSON';
import { deleteTrip as deleteTripModel, getTripById } from '../trips.model';

export const deleteTrip = withJSON<DeleteTripResponseDTO>()(
  async (_body, req) => {
    const id = getNumericId(req.params.id);

    if (id === null) {
      throw new APIError('Provided id is invalid', 422);
    }

    const trip = await getTripById(id);

    if (trip === undefined) {
      throw new APIError('Trip not found', 404);
    }

    return db.transaction(async (trx) => {
      await deleteTripParticipantsByTripId(id);
      await deleteTripModel(id).transacting(trx);

      return {};
    });
  },
);
