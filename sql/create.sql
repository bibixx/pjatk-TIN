-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2021-10-10 17:12:22.536

-- tables
-- Table: Hotel
CREATE TABLE Hotel (
    id SERIAL NOT NULL,
    numberOfStars float  NOT NULL,
    name varchar(255)  NOT NULL,
    CONSTRAINT Hotel_pk PRIMARY KEY (id)
);

-- Table: Participant
CREATE TABLE Participant (
    id SERIAL NOT NULL,
    name varchar(255)  NOT NULL,
    surname varchar(255)  NOT NULL,
    dob date  NOT NULL,
    email varchar(255)  NOT NULL,
    phoneNumber varchar(255)  NULL,
    CONSTRAINT Participant_pk PRIMARY KEY (id)
);

-- Table: Trip
CREATE TABLE Trip (
    id SERIAL NOT NULL,
    name varchar(255)  NOT NULL,
    idHotel int  NOT NULL,
    price float  NOT NULL,
    startOfTripDate date  NOT NULL,
    CONSTRAINT Trip_pk PRIMARY KEY (id)
);

-- Table: TripParticipant
CREATE TABLE TripParticipant (
    id SERIAL NOT NULL,
    idTrip int  NOT NULL,
    idParticipant int  NOT NULL,
    dateOfPayment date  NULL,
    discount float  NULL,
    CONSTRAINT TripParticipant_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: Table_3_Table_2 (table: Trip)
ALTER TABLE Trip ADD CONSTRAINT Table_3_Table_2
    FOREIGN KEY (idHotel)
    REFERENCES Hotel (id)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- Reference: TripParticipant_Participant (table: TripParticipant)
ALTER TABLE TripParticipant ADD CONSTRAINT TripParticipant_Participant
    FOREIGN KEY (idParticipant)
    REFERENCES Participant (id)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- Reference: TripParticipant_Trip (table: TripParticipant)
ALTER TABLE TripParticipant ADD CONSTRAINT TripParticipant_Trip
    FOREIGN KEY (idTrip)
    REFERENCES Trip (id)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- End of file.

