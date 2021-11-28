import {
  ParticipantTable,
  TripTable,
  TripParticipantTable,
} from 'types/tables';
import { formatDate } from 'utils/formatDate';
import { getNumericId } from 'utils/getNumericId';
import { getParticipantById } from './participants.model';
import {
  RenderableParticipant,
  RenderableParticipantTripParticipant,
} from './participants.types';

type GetParticipantInfoByIdReturnType =
  | {
      success: false;
      error: 'INVALID_ID';
    }
  | {
      success: false;
      error: 'NOT_FOUND';
    }
  | {
      success: true;
      participant: ParticipantTable;
    };

export const getParticipantInfoById = async (
  rawId: unknown,
): Promise<GetParticipantInfoByIdReturnType> => {
  const id = getNumericId(rawId);

  if (id === null) {
    return {
      success: false,
      error: 'INVALID_ID',
    };
  }

  const participant = await getParticipantById(id);

  if (participant === undefined) {
    return {
      success: false,
      error: 'NOT_FOUND',
    };
  }

  return {
    success: true,
    participant,
  };
};

export const formatParticipant = (
  participant: ParticipantTable,
): RenderableParticipant => ({
  id: participant.id,
  name: participant.name,
  surname: participant.surname,
  dob: participant.dob ? formatDate(participant.dob) : undefined,
  email: participant.email,
  phonenumber: participant.phonenumber || undefined,
});

export const formatTripParticipant = (
  tripParticipant: TripParticipantTable & TripTable,
): RenderableParticipantTripParticipant => ({
  id: tripParticipant.id,
  trip: {
    name: tripParticipant.name,
  },
  discount: tripParticipant.discount || undefined,
  dateofpayment: tripParticipant.dateofpayment
    ? formatDate(tripParticipant.dateofpayment)
    : undefined,
});
