import { Footer } from 'components/Footer/Footer';
import { Header } from 'components/Header/Header';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import { HotelCreate } from 'views/Hotels/HotelCreate/HotelCreate';
import { HotelDetails } from 'views/Hotels/HotelDetails/HotelDetails';
import { HotelEditDetails } from 'views/Hotels/HotelEditDetails/HotelEditDetails';
import { HotelsList } from 'views/Hotels/HotelsList/HotelsList';
import { Index } from 'views/Index/Index';
import { ParticipantCreate } from 'views/Participants/ParticipantCreate/ParticipantCreate';
import { ParticipantDetails } from 'views/Participants/ParticipantDetails/ParticipantDetails';
import { ParticipantDelete } from 'views/Participants/ParticipantDelete/ParticipantDelete';
import { ParticipantEditDetails } from 'views/Participants/ParticipantEditDetails/ParticipantEditDetails';
import { ParticipantsList } from 'views/Participants/ParticipantsList/ParticipantsList';
import { TripPaymentsList } from 'views/TripPayments/TripPaymentsList/TripPaymentsList';
import { TripsList } from 'views/Trips/TripsList/TripsList';
import { HotelDelete } from 'views/Hotels/HotelDelete/HotelDelete';
import { TripPaymentsDetails } from 'views/TripPayments/TripPaymentsDetails/TripPaymentsDetails';
import { TripPaymentsEditDetails } from 'views/TripPayments/TripPaymentsEditDetails/TripPaymentsEditDetails';
import { TripPaymentsCreate } from 'views/TripPayments/TripPaymentsCreate/TripPaymentsCreate';
import { TripPaymentsDelete } from 'views/TripPayments/TripPaymentsDelete/TripPaymentsDelete';
import { TripsCreate } from 'views/Trips/TripsCreate/TripsCreate';
import { TripsDetails } from 'views/Trips/TripsDetails/TripsDetails';
import { TripsDetailsEdit } from 'views/Trips/TripsDetailsEdit/TripsDetailsEdit';
import { TripsDelete } from 'views/Trips/TripsDelete/TripsDelete';
import { ProtectedWrapper } from 'components/ProtectedWrapper/ProtectedWrapper';
import { Login } from 'views/Auth/Login/Login';
import { Logout } from 'views/Auth/Logout/Logout';
import { Register } from 'views/Auth/Register/Register';

export const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Index />} />

        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/participants"
          element={<ProtectedWrapper userGroups={['admin']} />}
        >
          <Route index element={<ParticipantsList />} />
          <Route path="create" element={<ParticipantCreate />} />
          <Route path=":id" element={<ParticipantDetails />} />
          <Route path=":id/delete" element={<ParticipantDelete />} />
          <Route path=":id/update" element={<ParticipantEditDetails />} />
        </Route>

        <Route path="/trip-payments" element={<ProtectedWrapper />}>
          <Route index element={<TripPaymentsList />} />
          <Route path=":id" element={<TripPaymentsDetails />} />
          <Route element={<ProtectedWrapper userGroups={['admin']} />}>
            <Route path="create" element={<TripPaymentsCreate />} />
            <Route path=":id/delete" element={<TripPaymentsDelete />} />
            <Route path=":id/update" element={<TripPaymentsEditDetails />} />
          </Route>
        </Route>

        <Route path="/trips">
          <Route index element={<TripsList />} />
          <Route path=":id" element={<TripsDetails />} />
          <Route element={<ProtectedWrapper userGroups={['admin']} />}>
            <Route path="create" element={<TripsCreate />} />
            <Route path=":id/delete" element={<TripsDelete />} />
            <Route path=":id/update" element={<TripsDetailsEdit />} />
          </Route>
        </Route>

        <Route path="/hotels">
          <Route index element={<HotelsList />} />
          <Route path=":id" element={<HotelDetails />} />
          <Route element={<ProtectedWrapper userGroups={['admin']} />}>
            <Route path="create" element={<HotelCreate />} />
            <Route path=":id/delete" element={<HotelDelete />} />
            <Route path=":id/update" element={<HotelEditDetails />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
};
