import { Request, Response } from 'express';
import { renderEjs } from 'utils/ejs/renderEjs';
import { ViewArguments, ViewNames } from 'utils/ejs/types';
import { errorsFromEntries } from 'utils/errorsFromEntries';
import { getNumericId } from 'utils/getNumericId';
import { withView } from 'utils/views/withView';
import {
  getParticipantById,
  updateParticipant as updateParticipantModel,
} from '../participants.model';
import { participantValidator } from '../participants.validators';

type ViewData =
  | {
      success: true;
    }
  | {
      success: false;
      error: 'INVALID_ID';
    }
  | {
      success: false;
      error: 'NOT_FOUND';
    }
  | {
      success: false;
      error: 'INVALID_REQUEST_DATA';
      data: ViewArguments[ViewNames.PARTICIPANT_UPDATE];
    };

const updateParticipantView = (res: Response, data: ViewData) => {
  if (data.success) {
    return res.redirect('/participants/?updated=true');
  }

  if (data.error === 'INVALID_ID' || data.error === 'NOT_FOUND') {
    return res.redirect('/participants/?error=true');
  }

  if (data.error === 'INVALID_REQUEST_DATA') {
    return renderEjs(res, ViewNames.PARTICIPANT_UPDATE, data.data);
  }

  const shouldBeNever: never = data;
  return shouldBeNever;
};

export const updateParticipant = withView(updateParticipantView)(
  async (req: Request) => {
    const id = getNumericId(req.params.id);

    if (id === null) {
      return {
        success: false,
        error: 'INVALID_ID',
      };
    }

    const { body } = req;

    const validationResult = participantValidator(body);
    const oldParticipant = await getParticipantById(id);

    if (oldParticipant === undefined) {
      return {
        success: false,
        error: 'NOT_FOUND',
      };
    }

    if (!validationResult.success) {
      return {
        success: false,
        error: 'INVALID_REQUEST_DATA',
        data: {
          participant: body,
          errors: errorsFromEntries(validationResult.errors),
        },
      };
    }

    const participant = validationResult.value;

    await updateParticipantModel(id, participant);

    return {
      success: true,
    };
  },
);
