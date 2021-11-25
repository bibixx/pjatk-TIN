import { Request, Response } from 'express';
import { renderEjs } from 'utils/ejs/renderEjs';
import { ViewNames } from 'utils/ejs/types';
import { withEjsResponse } from 'utils/ejs/withEjsResponse';
import { errorsFromEntries } from 'utils/errorsFromEntries';
import { getNumericId } from 'utils/getNumericId';
import {
  formatParticipant,
  getParticipantInfoById,
} from './participants.controllers.utils';

import {
  getParticipantById,
  updateParticipant as updateParticipantModel,
} from '../participants.model';
import { participantValidator } from '../participants.validators';

export const getUpdateParticipantView = withEjsResponse(
  async (req: Request) => {
    try {
      const participant = await getParticipantInfoById(req.params.id);

      return renderEjs(ViewNames.PARTICIPANT_UPDATE, {
        participant: formatParticipant(participant),
        errors: undefined,
      });
    } catch (error) {
      return renderEjs(ViewNames.PARTICIPANT_NOT_FOUND, {});
    }
  },
);

export const updateParticipant = withEjsResponse(
  async (req: Request, res: Response) => {
    const id = getNumericId(req.params.id);

    if (id === null) {
      res.redirect('/participants/?error=true');
      return undefined;
    }

    const { body } = req;

    const validationResult = participantValidator(body);
    const oldParticipant = await getParticipantById(id);

    if (oldParticipant === undefined) {
      res.redirect('/participants/?error=true');
      return undefined;
    }

    if (!validationResult.success) {
      return renderEjs(ViewNames.PARTICIPANT_UPDATE, {
        participant: body,
        errors: errorsFromEntries(validationResult.errors),
      });
    }

    const participant = validationResult.value;

    await updateParticipantModel(id, participant);

    res.redirect('/participants/?updated=true');
    return undefined;
  },
);
