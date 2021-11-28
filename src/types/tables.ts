export interface ParticipantTable {
  id: number;
  name: string;
  surname: string;
  dob: Date;
  email: string;
  phonenumber: string | null;
}

export interface TripParticipantTable {
  id: number;
  idtrip: number;
  idparticipant: number;
  discount: number | null;
  dateofpayment: Date | null;
}

export interface TripTable {
  id: number;
  name: string;
  idhotel: number;
  price: number;
  startoftripdate: Date;
}

export interface HotelTable {
  id: number;
  numberofstars: number;
  name: string;
}
