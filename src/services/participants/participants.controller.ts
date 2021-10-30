import { db } from 'core/db';
import { Request } from 'express';
import { getTripParticipantByParticipantId } from 'services/tripParticipants/tripParticipants.model';
import { getNumericId } from 'utils/getNumericId';
import { APIError, withJsonResponse } from 'utils/withJsonResponse';
import {
  CreateParticipantResponseDTO,
  DeleteParticipantByIdDTO,
  GetParticipantByIdDTO,
  GetParticipantsDTO,
  UpdateParticipantResponseDTO,
} from './participants.dto';
import {
  deleteParticipantById,
  getAllParticipants,
  getParticipantById,
  createParticipant as createParticipantModel,
  updateParticipant as updateParticipantModel,
} from './participants.model';
import {
  isCreateParticipantBodyValid,
  isUpdateParticipantBodyValid,
} from './participants.utils';

export const getParticipants = withJsonResponse<GetParticipantsDTO>(
  async () => {
    const participants = await getAllParticipants();

    return {
      participants,
    };
  },
);

export const getParticipant = withJsonResponse<GetParticipantByIdDTO>(
  async (req: Request) => {
    const id = getNumericId(req.params.id);

    if (id === null) {
      throw new APIError(400, 'Passed id is not an number');
    }

    const participant = await getParticipantById(id);

    if (participant === undefined) {
      throw new APIError(404, "Participant with provided id doesn't exist");
    }

    return { participant };
  },
);

export const deleteParticipant = withJsonResponse<DeleteParticipantByIdDTO>(
  async (req: Request) => {
    const id = getNumericId(req.params.id);

    if (id === null) {
      throw new APIError(400, 'Passed id is not an number');
    }

    const countOfDeletedElement = await db.transaction(async (trx) => {
      const tripParticipant = await getTripParticipantByParticipantId(
        id,
      ).transacting(trx);

      if (tripParticipant !== undefined) {
        throw new APIError(
          400,
          'This participant is assigned to a tripParticipant',
        );
      }

      return deleteParticipantById(id).transacting(trx);
    });

    if (countOfDeletedElement === 0) {
      throw new APIError(404, "Participant with specified id doesn't exist");
    }

    return {};
  },
);

export const createParticipant = withJsonResponse<CreateParticipantResponseDTO>(
  async (req: Request) => {
    const { body } = req;
    if (!isCreateParticipantBodyValid(body)) {
      throw new APIError(400, 'Participant object is not valid');
    }

    const { participant } = body;

    const [newParticipant] = await createParticipantModel(participant);

    return {
      participant: newParticipant,
    };
  },
);

export const updateParticipant = withJsonResponse<UpdateParticipantResponseDTO>(
  async (req: Request) => {
    const id = getNumericId(req.params.id);

    if (id === null) {
      throw new APIError(400, 'Passed id is not an number');
    }

    const { body } = req;
    if (!isUpdateParticipantBodyValid(body)) {
      throw new APIError(400, 'Participant object is not valid');
    }

    const [updatedParticipant] = await db.transaction(async (trx) => {
      const oldParticipant = await getParticipantById(id).transacting(trx);

      if (oldParticipant === undefined) {
        throw new APIError(404, "Participant with provided id doesn't exist");
      }

      const { participant } = body;

      return updateParticipantModel(id, participant).transacting(trx);
    });

    return {
      participant: updatedParticipant,
    };
  },
);
