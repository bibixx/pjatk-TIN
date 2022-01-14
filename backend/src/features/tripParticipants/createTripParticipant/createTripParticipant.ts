import { withJSON } from 'utils/withJSON/withJSON';
import {
  CreateTripParticipantRequestDTO,
  CreateTripParticipantResponseDTO,
  TripParticipantTable,
  tripParticipantValidator,
} from '@s19192/shared';
import { replaceDateWithTimestamp } from 'utils/replaceDateWithString';
import { createTripParticipant as createTripParticipantModel } from '../tripParticipants.model';

export const createTripParticipant = withJSON<
  CreateTripParticipantResponseDTO,
  CreateTripParticipantRequestDTO
>(tripParticipantValidator)(async (tripParticipant) => {
  const [newTripParticipant] = await createTripParticipantModel(
    tripParticipant,
  );

  return {
    tripParticipant: replaceDateWithTimestamp(
      newTripParticipant as TripParticipantTable,
    ),
  };
});
