import { Footer } from 'components/Footer/Footer';
import { Header } from 'components/Header/Header';
import { PageContainer } from 'components/PageContainer/PageContainer';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import { HotelsList } from 'views/Hotels/HotelsList/HotelsList';
import { Index } from 'views/Index/Index';
import { ParticipantCreate } from 'views/Participants/ParticipantCreate/ParticipantCreate';
import { ParticipantDetails } from 'views/Participants/ParticipantDetails/ParticipantDetails';
import { ParticipantDelete } from 'views/Participants/ParticipantDetailsDelete/ParticipantDetailsDelete';
import { ParticipantEditDetails } from 'views/Participants/ParticipantEditDetails/ParticipantEditDetails';
import { ParticipantsList } from 'views/Participants/ParticipantsList/ParticipantsList';
import { TripPaymentsList } from 'views/TripPayments/TripPaymentsList/TripPaymentsList';
import { TripsList } from 'views/Trips/TripsList/TripsList';

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
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
};
