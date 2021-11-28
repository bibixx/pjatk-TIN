import { db } from 'core/db';
import { Request, Response } from 'express';
import { deleteTripParticipantByParticipantId } from 'features/tripParticipants/tripParticipants.model';
import { getNumericId } from 'utils/getNumericId';
import { withView } from 'utils/views/withView';
import { deleteParticipantById } from '../participants.model';

type ViewData =
  | {
      success: true;
    }
  | {
      success: false;
      error: 'NOT_FOUND';
    }
  | {
      success: false;
      error: 'INVALID_ID';
    };

const deleteParticipantView = (res: Response, data: ViewData) => {
  if (!data.success) {
    return res.redirect(`/participants/?deleteError=true`);
  }

  return res.redirect('/participants/?deleted=true');
};

export const deleteParticipant = withView(deleteParticipantView)(
  async (req: Request) => {
    const id = getNumericId(req.params.id);

    if (id === null) {
      return {
        success: false,
        error: 'INVALID_ID',
      };
    }

    const deletedCount = await db.transaction(async (trx) => {
      await deleteTripParticipantByParticipantId(id).transacting(trx);

      return deleteParticipantById(id).transacting(trx);
    });

    if (deletedCount === 0) {
      return {
        success: false,
        error: 'NOT_FOUND',
      };
    }

    return {
      success: true,
    };
  },
);
