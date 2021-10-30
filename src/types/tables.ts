export interface Participant {
  id: number;
  name: string;
  surname: string;
  dob: string;
  email: string;
  phonenumber: string | null | undefined;
}

export interface TripParticipant {
  id: number;
  idtrip: number;
  idparticipant: number;
}
