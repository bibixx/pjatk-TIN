import { Participant, Trip, TripParticipant } from 'types/tables';
import { APIError } from 'utils/errors';
import { getNumericId } from 'utils/getNumericId';
import { getParticipantById } from '../participants.model';
import {
  RenderableParticipant,
  RenderableTripParticipant,
} from '../participants.types';

export const getParticipantInfoById = async (rawId: unknown) => {
  const id = getNumericId(rawId);

  if (id === null) {
    throw new APIError(400, 'Passed id is not an number');
  }

  const participant = await getParticipantById(id);

  if (participant === undefined) {
    throw new APIError(404, "Participant with provided id doesn't exist");
  }

  return participant;
};

const padStart = (value: number) => `00${value}`.slice(-2);
const formatDate = (date: Date) =>
  `${date.getFullYear()}-${padStart(date.getMonth() + 1)}-${padStart(
    date.getDate(),
  )}`;

export const formatParticipant = (
  participant: Participant,
): RenderableParticipant => ({
  id: participant.id,
  name: participant.name,
  surname: participant.surname,
  dob: participant.dob ? formatDate(participant.dob) : undefined,
  email: participant.email,
  phonenumber: participant.phonenumber || undefined,
});

export const formatTripParticipant = (
  tripParticipant: TripParticipant & Trip,
): RenderableTripParticipant => ({
  id: tripParticipant.id,
  trip: {
    name: tripParticipant.name,
  },
  discount: tripParticipant.discount || undefined,
  dateofpayment: tripParticipant.dateofpayment
    ? formatDate(tripParticipant.dateofpayment)
    : undefined,
});
