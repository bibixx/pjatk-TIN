import {
  RenderableParticipant,
  RenderableParticipantTripParticipant,
} from 'features/participants/participants.types';
import {
  TripParticipant,
  RenderableTripParticipant,
} from 'features/tripParticipants/tripParticipants.types';
import { HotelTable, TripTable } from 'types/tables';

export enum ViewNames {
  HOME = 'HOME',
  ERROR = 'ERROR',

  PARTICIPANTS_LIST = 'PARTICIPANTS_LIST',
  PARTICIPANT_DETAILS = 'PARTICIPANT_DETAILS',
  PARTICIPANT_UPDATE = 'PARTICIPANT_UPDATE',
  PARTICIPANT_NOT_FOUND = 'PARTICIPANT_NOT_FOUND',
  PARTICIPANT_CREATE = 'PARTICIPANT_CREATE',
  PARTICIPANT_DELETE = 'PARTICIPANT_DELETE',

  TRIP_PARTICIPANT_LIST = 'TRIP_PARTICIPANT_LIST',
  TRIP_PARTICIPANT_DETAILS = 'TRIP_PARTICIPANT_DETAILS',

  HOTEL_LIST = 'HOTEL_LIST',
  HOTEL_DETAILS = 'HOTEL_DETAILS',
  HOTEL_CREATE = 'HOTEL_CREATE',
  HOTEL_DELETE = 'HOTEL_DELETE',
  HOTEL_UPDATE = 'HOTEL_UPDATE',
  HOTEL_NOT_FOUND = 'HOTEL_NOT_FOUND',
  HOTEL_DELETE_TRIP_EXISTS = 'HOTEL_DELETE_TRIP_EXISTS',
}

export const VIEW_PATHS: Record<ViewNames, string> = {
  [ViewNames.HOME]: 'pages/index',
  [ViewNames.ERROR]: 'pages/error',

  [ViewNames.PARTICIPANTS_LIST]: 'pages/participants/list',
  [ViewNames.PARTICIPANT_DETAILS]: 'pages/participants/details',
  [ViewNames.PARTICIPANT_UPDATE]: 'pages/participants/update',
  [ViewNames.PARTICIPANT_DELETE]: 'pages/participants/delete',
  [ViewNames.PARTICIPANT_CREATE]: 'pages/participants/create',
  [ViewNames.PARTICIPANT_NOT_FOUND]: 'pages/participants/not-found',

  [ViewNames.TRIP_PARTICIPANT_LIST]: 'pages/trip-payments/list',
  [ViewNames.TRIP_PARTICIPANT_DETAILS]: 'pages/trip-payments/details',

  [ViewNames.HOTEL_LIST]: 'pages/hotels/list',
  [ViewNames.HOTEL_CREATE]: 'pages/hotels/create',
  [ViewNames.HOTEL_UPDATE]: 'pages/hotels/update',
  [ViewNames.HOTEL_DETAILS]: 'pages/hotels/details',
  [ViewNames.HOTEL_DELETE]: 'pages/hotels/delete',
  [ViewNames.HOTEL_NOT_FOUND]: 'pages/hotels/not-found',
  [ViewNames.HOTEL_DELETE_TRIP_EXISTS]: 'pages/hotels/delete-trip-exists',
};

export type ViewArguments = {
  [ViewNames.HOME]: {};
  [ViewNames.ERROR]: {};
  [ViewNames.PARTICIPANTS_LIST]: {
    participants: RenderableParticipant[];
    hasSuccess: boolean;
    hasDeleted: boolean;
    hasAdded: boolean;
    hasError: boolean;
  };
  [ViewNames.PARTICIPANT_DETAILS]: {
    participant: RenderableParticipant;
    tripParticipants: RenderableParticipantTripParticipant[];
  };
  [ViewNames.PARTICIPANT_UPDATE]: {
    participant: RenderableParticipant;
    errors: undefined | Partial<Record<keyof RenderableParticipant, string>>;
  };
  [ViewNames.PARTICIPANT_DELETE]: {
    participant: RenderableParticipant;
  };
  [ViewNames.PARTICIPANT_CREATE]: {
    participant: RenderableParticipant;
    errors: undefined | Partial<Record<keyof RenderableParticipant, string>>;
  };
  [ViewNames.PARTICIPANT_NOT_FOUND]: {};

  [ViewNames.TRIP_PARTICIPANT_LIST]: {
    tripParticipants: TripParticipant[];
  };
  [ViewNames.TRIP_PARTICIPANT_DETAILS]: {
    tripParticipant: RenderableTripParticipant;
  };

  [ViewNames.HOTEL_LIST]: {
    hotels: HotelTable[];
    hasSuccess: boolean;
    hasDeleted: boolean;
    hasAdded: boolean;
    hasError: boolean;
  };
  [ViewNames.HOTEL_DETAILS]: {
    hotel: HotelTable;
    trips: TripTable[];
  };
  [ViewNames.HOTEL_CREATE]: {
    hotel: Partial<HotelTable>;
    errors: undefined | Partial<Record<keyof HotelTable, string>>;
  };
  [ViewNames.HOTEL_UPDATE]: {
    hotel: Partial<HotelTable>;
    errors: undefined | Partial<Record<keyof HotelTable, string>>;
  };
  [ViewNames.HOTEL_DELETE]: {
    hotel: HotelTable;
  };
  [ViewNames.HOTEL_DELETE_TRIP_EXISTS]: {
    hotel: HotelTable;
  };
  [ViewNames.HOTEL_NOT_FOUND]: {};
};

export type View<T extends ViewNames> = {
  path: string;
  data: ViewArguments[T];
};
