import { participantValidator } from 'features/participants/participants.validators';
import { setupFormValidation } from './utils/setupFormValidation';

const formFields = ['name', 'surname', 'dob', 'email', 'phonenumber'];
setupFormValidation(participantValidator, formFields);
