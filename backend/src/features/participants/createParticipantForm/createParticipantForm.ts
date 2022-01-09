import { Response } from 'express';
import { renderEjs } from 'utils/ejs/renderEjs';
import { ViewNames } from 'utils/ejs/types';
import { withView } from 'utils/views/withView';

const createParticipantFormView = (res: Response) => {
  return renderEjs(res, ViewNames.PARTICIPANT_CREATE, {
    participant: {},
    errors: undefined,
  });
};

export const createParticipantForm = withView(createParticipantFormView)(
  async () => {},
);
