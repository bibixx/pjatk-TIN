import { Request } from 'express';
import { renderEjs } from 'utils/ejs/renderEjs';
import { ViewNames } from 'utils/ejs/types';
import { withEjsResponse } from 'utils/ejs/withEjsResponse';
import { getTripParticipantsByParticipantId } from 'services/tripParticipants/tripParticipants.model';
import {
  formatParticipant,
  formatTripParticipant,
  getParticipantInfoById,
} from './participants.controllers.utils';

import { getAllParticipants } from '../participants.model';

export const getParticipants = withEjsResponse(async (req: Request) => {
  const participants = await getAllParticipants();
  const hasSuccess = req.query.updated === 'true';
  const hasDeleted = req.query.deleted === 'true';
  const hasAdded = req.query.added === 'true';
  const hasError = req.query.deleteError === 'true';

  return renderEjs(ViewNames.PARTICIPANTS_LIST, {
    participants: participants.map(formatParticipant),
    hasSuccess,
    hasDeleted,
    hasAdded,
    hasError,
  });
});

export const getParticipant = withEjsResponse(async (req: Request) => {
  try {
    const { id } = req.params;
    const participant = await getParticipantInfoById(id);

    const tripParticipants = await getTripParticipantsByParticipantId(
      id as any,
    );

    return renderEjs(ViewNames.PARTICIPANT_DETAILS, {
      participant: formatParticipant(participant),
      tripParticipants: tripParticipants.map(formatTripParticipant),
    });
  } catch (error) {
    return renderEjs(ViewNames.PARTICIPANT_NOT_FOUND, {});
  }
});
