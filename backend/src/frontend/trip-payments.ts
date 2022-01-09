import { tripParticipantValidator } from 'features/tripParticipants/tripParticipants.validators';
import { setupFormValidation } from './utils/setupFormValidation';

const formFields = ['dateofpayment', 'discount', 'idparticipant', 'idtrip'];
setupFormValidation(tripParticipantValidator, formFields);
