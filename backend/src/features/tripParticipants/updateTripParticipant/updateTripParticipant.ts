import { getNumericId } from 'utils/getNumericId';
import { APIError, withJSON } from 'utils/withJSON/withJSON';
import {
  TripParticipantTable,
  tripParticipantValidator,
  UpdateTripParticipantRequestDTO,
  UpdateTripParticipantResponseDTO,
} from '@s19192/shared';
import { replaceDateWithTimestamp } from 'utils/replaceDateWithString';
import {
  getTripParticipantById,
  updateTripParticipant as updateTripParticipantModel,
} from '../tripParticipants.model';

export const updateTripParticipant = withJSON<
  UpdateTripParticipantResponseDTO,
  UpdateTripParticipantRequestDTO
>(tripParticipantValidator)(async (tripParticipant, req) => {
  const id = getNumericId(req.params.id);

  if (id === null) {
    throw new APIError('Provided id is invalid', 422);
  }

  const oldTripParticipant = await getTripParticipantById(id);

  if (oldTripParticipant === undefined) {
    throw new APIError('TripParticipant not found', 404);
  }

  const [newTripParticipant] = await updateTripParticipantModel(
    id,
    tripParticipant,
  );

  return {
    tripParticipant: replaceDateWithTimestamp(
      newTripParticipant as TripParticipantTable,
    ),
  };
});
