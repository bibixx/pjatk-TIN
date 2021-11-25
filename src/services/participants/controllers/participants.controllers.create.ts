import { Request, Response } from 'express';
import { renderEjs } from 'utils/ejs/renderEjs';
import { ViewNames } from 'utils/ejs/types';
import { withEjsResponse } from 'utils/ejs/withEjsResponse';
import { errorsFromEntries } from 'utils/errorsFromEntries';

import { createParticipant as createParticipantModel } from '../participants.model';
import { participantValidator } from '../participants.validators';

export const getCreateParticipantView = withEjsResponse(async () =>
  renderEjs(ViewNames.PARTICIPANT_CREATE, {
    participant: {},
    errors: undefined,
  }),
);

export const createParticipant = withEjsResponse(
  async (req: Request, res: Response) => {
    const { body } = req;

    const validationResult = participantValidator(body);

    if (!validationResult.success) {
      return renderEjs(ViewNames.PARTICIPANT_CREATE, {
        participant: body,
        errors: errorsFromEntries(validationResult.errors),
      });
    }

    const participant = validationResult.value;

    await createParticipantModel(participant);

    res.redirect('/participants/?added=true');
    return undefined;
  },
);
