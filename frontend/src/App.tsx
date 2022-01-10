import { Footer } from 'components/Footer/Footer';
import { Header } from 'components/Header/Header';
import { PageContainer } from 'components/PageContainer/PageContainer';
import { Route, Routes } from 'react-router-dom';
import { HotelsList } from 'views/Hotels/HotelsList/HotelsList';
import { Index } from 'views/Index/Index';
import { ParticipantDetails } from 'views/Participants/ParticipantDetails/ParticipantDetails';
import { ParticipantsList } from 'views/Participants/ParticipantsList/ParticipantsList';
import { TripPaymentsList } from 'views/TripPayments/TripPaymentsList/TripPaymentsList';
import { TripsList } from 'views/Trips/TripsList/TripsList';

export const App = () => {
  return (
    <>
      <Header />
      <PageContainer>
        <Routes>
          <Route path="/" element={<Index />} />

          <Route path="/participants" element={<ParticipantsList />} />
          <Route path="/participants/:id" element={<ParticipantDetails />} />

          <Route path="/trip-payments" element={<TripPaymentsList />} />

          <Route path="/trips" element={<TripsList />} />

          <Route path="/hotels" element={<HotelsList />} />
        </Routes>
      </PageContainer>
      <Footer />
    </>
  );
};
