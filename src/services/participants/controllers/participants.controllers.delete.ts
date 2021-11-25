import { db } from 'core/db';
import { Request, Response } from 'express';
import { deleteTripParticipantByParticipantId } from 'services/tripParticipants/tripParticipants.model';
import { renderEjs } from 'utils/ejs/renderEjs';
import { ViewNames } from 'utils/ejs/types';
import { withEjsResponse } from 'utils/ejs/withEjsResponse';

import { getNumericId } from 'utils/getNumericId';
import {
  formatParticipant,
  getParticipantInfoById,
} from './participants.controllers.utils';

import { deleteParticipantById } from '../participants.model';

export const getDeleteParticipantView = withEjsResponse(
  async (req: Request) => {
    try {
      const participant = await getParticipantInfoById(req.params.id);

      return renderEjs(ViewNames.PARTICIPANT_DELETE, {
        participant: formatParticipant(participant),
      });
    } catch (error) {
      return renderEjs(ViewNames.PARTICIPANT_NOT_FOUND, {});
    }
  },
);

export const deleteParticipant = async (req: Request, res: Response) => {
  const id = getNumericId(req.params.id);

  if (id === null) {
    return res.redirect(`/participants/?deleteError=true`);
  }

  const deletedCount = await db.transaction(async (trx) => {
    await deleteTripParticipantByParticipantId(id).transacting(trx);

    return deleteParticipantById(id).transacting(trx);
  });

  if (deletedCount === 0) {
    return res.redirect(`/participants/?deleteError=true`);
  }

  return res.redirect('/participants/?deleted=true');
};
