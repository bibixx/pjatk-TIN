import { GetTripsResponseDTO } from '@s19192/shared';
import { getNumericId } from 'utils/getNumericId';
import { replaceDateWithTimestamp } from 'utils/replaceDateWithString';
import { withJSON } from 'utils/withJSON/withJSON';
import { getAllTrips } from '../trips.model';

export const getTrips = withJSON<GetTripsResponseDTO>()(async (_body, req) => {
  const hotelId = getNumericId(req.query.idhotel) ?? undefined;
  const trips = await getAllTrips({ hotelId });

  return {
    trips: trips.map(replaceDateWithTimestamp),
  };
});
