import { Request, Response } from 'express';
import { renderEjs } from 'utils/ejs/renderEjs';
import { ViewArguments, ViewNames } from 'utils/ejs/types';
import { errorsFromEntries } from 'utils/errorsFromEntries';
import { withView } from 'utils/views/withView';
import { participantValidator } from '../participants.validators';
import { createParticipant as createParticipantModel } from '../participants.model';

type ViewData =
  | {
      success: true;
    }
  | {
      success: false;
      error: 'INVALID_REQUEST_DATA';
      data: ViewArguments[ViewNames.PARTICIPANT_CREATE];
    };

const createParticipantView = (res: Response, data: ViewData) => {
  if (!data.success && data.error === 'INVALID_REQUEST_DATA') {
    return renderEjs(res, ViewNames.PARTICIPANT_CREATE, data.data);
  }

  res.redirect('/participants/?added=true');
  return undefined;
};

export const createParticipant = withView(createParticipantView)(
  async (req: Request) => {
    const { body } = req;

    const validationResult = participantValidator(body);

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

    await createParticipantModel(participant);

    return {
      success: true,
    };
  },
);
