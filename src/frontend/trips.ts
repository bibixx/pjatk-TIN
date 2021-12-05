import { tripValidator } from 'features/trips/trips.validators';
import { setupFormValidation } from './utils/setupFormValidation';

const formFields = ['name', 'price', 'startoftripdate', 'idhotel'];
setupFormValidation(tripValidator, formFields);
