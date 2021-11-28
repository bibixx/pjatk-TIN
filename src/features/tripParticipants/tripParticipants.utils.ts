import { formatParticipant } from 'features/participants/participants.utils';
import { formatDate } from 'utils/formatDate';
import {
  RenderableTripParticipant,
  TripParticipant,
} from './tripParticipants.types';

export const formatTripParticipant = (
  tripParticipant: TripParticipant,
): RenderableTripParticipant => ({
  id: tripParticipant.id,
  trip: tripParticipant.trip,
  participant: formatParticipant(tripParticipant.participant),
  discount: tripParticipant.discount ?? undefined,
  dateofpayment: tripParticipant.dateofpayment
    ? formatDate(tripParticipant.dateofpayment)
    : undefined,
});
