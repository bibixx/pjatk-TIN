import { TripTable } from 'types/tables';
import { parseDate } from 'utils/parseDate';

export const formatIncomingTripData = (data: any): Partial<TripTable> => ({
  ...data,
  startoftripdate: parseDate(data.startoftripdate),
});
