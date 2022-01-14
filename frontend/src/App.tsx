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

export const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />

        <Route path="/participants" element={<ParticipantsList />} />
        <Route path="/participants/create" element={<ParticipantCreate />} />
        <Route path="/participants/:id" element={<ParticipantDetails />} />
        <Route
          path="/participants/:id/delete"
          element={<ParticipantDelete />}
        />
        <Route
          path="/participants/:id/update"
          element={<ParticipantEditDetails />}
        />

        <Route path="/trip-payments" element={<TripPaymentsList />} />

        <Route path="/trips" element={<TripsList />} />

        <Route path="/hotels" element={<HotelsList />} />
        <Route path="/hotels/create" element={<HotelCreate />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />
        <Route path="/hotels/:id/delete" element={<HotelDelete />} />
        <Route path="/hotels/:id/update" element={<HotelEditDetails />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
};
