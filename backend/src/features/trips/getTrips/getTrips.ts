import { GetTripsResponseDTO } from '@s19192/shared';
import { replaceDateWithTimestamp } from 'utils/replaceDateWithString';
import { withJSON } from 'utils/withJSON/withJSON';
import { getAllTrips } from '../trips.model';

export const getTrips = withJSON<GetTripsResponseDTO>()(async () => {
  const trips = await getAllTrips();

  return {
    trips: trips.map(replaceDateWithTimestamp),
  };
});
