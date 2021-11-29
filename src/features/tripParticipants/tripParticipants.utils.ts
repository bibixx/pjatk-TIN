import { TripParticipantTable } from 'types/tables';
import { parseDate } from 'utils/parseDate';

export const formatIncomingTripParticipantData = (
  data: any,
): Partial<TripParticipantTable> => ({
  ...data,
  dateofpayment: parseDate(data.dateofpayment),
});
