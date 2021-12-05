import { hotelValidator } from 'features/hotels/hotels.validators';
import { setupFormValidation } from './utils/setupFormValidation';

const formFields = ['name', 'numberofstars'];
setupFormValidation(hotelValidator, formFields);
