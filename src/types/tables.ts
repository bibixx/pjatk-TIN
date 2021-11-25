export interface Participant {
  id: number;
  name: string;
  surname: string;
  dob: Date;
  email: string;
  phonenumber: string | null;
}

export interface TripParticipant {
  id: number;
  idtrip: number;
  idparticipant: number;
  discount: number | null;
  dateofpayment: Date | null;
}

export interface Trip {
  id: number;
  name: string;
  idhotel: number;
  price: number;
  startoftripdate: Date;
}
