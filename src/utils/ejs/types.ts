import {
  RenderableParticipant,
  RenderableTripParticipant,
} from 'services/participants/participants.types';

export enum ViewNames {
  HOME = 'HOME',

  PARTICIPANTS_LIST = 'PARTICIPANTS_LIST',
  PARTICIPANT_DETAILS = 'PARTICIPANT_DETAILS',
  PARTICIPANT_UPDATE = 'PARTICIPANT_UPDATE',
  PARTICIPANT_NOT_FOUND = 'PARTICIPANT_NOT_FOUND',
  PARTICIPANT_CREATE = 'PARTICIPANT_CREATE',
  PARTICIPANT_DELETE = 'PARTICIPANT_DELETE',
}

export const VIEW_PATHS = {
  [ViewNames.HOME]: 'pages/index',

  [ViewNames.PARTICIPANTS_LIST]: 'pages/participants/list',
  [ViewNames.PARTICIPANT_DETAILS]: 'pages/participants/details',
  [ViewNames.PARTICIPANT_UPDATE]: 'pages/participants/update',
  [ViewNames.PARTICIPANT_DELETE]: 'pages/participants/delete',
  [ViewNames.PARTICIPANT_CREATE]: 'pages/participants/create',
  [ViewNames.PARTICIPANT_NOT_FOUND]: 'pages/participants/not-found',
};

export type ViewArguments = {
  [ViewNames.HOME]: {};
  [ViewNames.PARTICIPANTS_LIST]: {
    participants: RenderableParticipant[];
    hasSuccess: boolean;
    hasDeleted: boolean;
    hasAdded: boolean;
    hasError: boolean;
  };
  [ViewNames.PARTICIPANT_DETAILS]: {
    participant: RenderableParticipant;
    tripParticipants: RenderableTripParticipant[];
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
};

export type View<T extends ViewNames> = {
  path: string;
  data: ViewArguments[T];
};
