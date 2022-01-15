-- Truncate
TRUNCATE public.tripparticipant CASCADE;
TRUNCATE public.trip CASCADE;
TRUNCATE public.hotel CASCADE;
TRUNCATE public.participant CASCADE;
TRUNCATE public.user CASCADE;

-- Hotel
INSERT INTO public.hotel (id, numberofstars, name) VALUES (1, 5, 'Sunrise Mountain Hotel');
INSERT INTO public.hotel (id, numberofstars, name) VALUES (2, 4, 'Parallel Gorge Resort & Spa');
INSERT INTO public.hotel (id, numberofstars, name) VALUES (3, 3, 'Soft Sierra Hotel');
INSERT INTO public.hotel (id, numberofstars, name) VALUES (4, 2, 'Antique Horizon Motel');
INSERT INTO public.hotel (id, numberofstars, name) VALUES (5, 1, 'Atlantis Residence Hotel');
INSERT INTO public.hotel (id, numberofstars, name) VALUES (6, 5, 'Illustrious Grotto Hotel');
INSERT INTO public.hotel (id, numberofstars, name) VALUES (7, 4, 'Elysium Hotel & Spa');
ALTER SEQUENCE hotel_id_seq RESTART WITH 8;

-- Participant
INSERT INTO public.participant (id, name, surname, dob, email, phonenumber) VALUES (1, 'Arkadiusz', 'Kaczmarczyk', '1997-04-01', 'arkadiusz.kaczmarczyk@gmail.com', '533 148 609');
INSERT INTO public.participant (id, name, surname, dob, email, phonenumber) VALUES (2, 'Edward', 'Chmielewski', '1970-08-18', 'edward.chmielewski@wp.pl', '811 891 584');
INSERT INTO public.participant (id, name, surname, dob, email, phonenumber) VALUES (3, 'Franciszek', 'Mazurek', '1978-02-24', 'franciszek.mazurek@onet.pl', '339 251 681');
INSERT INTO public.participant (id, name, surname, dob, email, phonenumber) VALUES (4, 'Rafał', 'Szymański', '1997-09-28', 'rafał.szymański@o2.pl', '986 449 024');
INSERT INTO public.participant (id, name, surname, dob, email, phonenumber) VALUES (5, 'Jędrzej', 'Nowak', '1972-08-16', 'jędrzej.nowak@interia.pl', '169 199 438');
INSERT INTO public.participant (id, name, surname, dob, email, phonenumber) VALUES (6, 'Hubert', 'Sokołowski', '1962-02-03', 'hubert.sokołowski@gmail.com', '624 508 258');
INSERT INTO public.participant (id, name, surname, dob, email, phonenumber) VALUES (7, 'Maurycy', 'Malinowski', '1969-09-13', 'maurycy.malinowski@yahoo.com', '631 401 720');
ALTER SEQUENCE participant_id_seq RESTART WITH 8;

-- Trip
INSERT INTO public.trip (id, name, idhotel, price, startoftripdate) VALUES (1, 'Egipt', 1, 2029, '2021-07-05');
INSERT INTO public.trip (id, name, idhotel, price, startoftripdate) VALUES (2, 'Chorwacja', 1, 3132, '2021-01-08');
INSERT INTO public.trip (id, name, idhotel, price, startoftripdate) VALUES (3, 'Włochy', 2, 4867, '2021-07-02');
INSERT INTO public.trip (id, name, idhotel, price, startoftripdate) VALUES (4, 'Wyspy Kanaryjskie', 3, 4750, '2021-04-17');
INSERT INTO public.trip (id, name, idhotel, price, startoftripdate) VALUES (5, 'Hiszpania', 4, 4013, '2021-07-02');
INSERT INTO public.trip (id, name, idhotel, price, startoftripdate) VALUES (6, 'Grecja', 5, 4366, '2021-03-29');
INSERT INTO public.trip (id, name, idhotel, price, startoftripdate) VALUES (7, 'Turcja', 6, 4310, '2021-04-16');
ALTER SEQUENCE trip_id_seq RESTART WITH 8;

-- Trip-Participant
INSERT INTO public.tripparticipant (id, idtrip, idparticipant, dateofpayment, discount) VALUES (1, 1, 1, '2021-06-05', 10);
INSERT INTO public.tripparticipant (id, idtrip, idparticipant, dateofpayment, discount) VALUES (2, 1, 2, null, null);
INSERT INTO public.tripparticipant (id, idtrip, idparticipant, dateofpayment, discount) VALUES (3, 2, 1, '2020-12-10', 50);
ALTER SEQUENCE tripparticipant_id_seq RESTART WITH 4;

-- User
INSERT INTO public.user (id, username, password, "userType", idparticipant) VALUES (1, 'admin', '$2b$10$Rz7jlNW23zetE3Pbxd3v9eaoOGOVsMEkbgnUaTbklxAMDVuYWrqFC', 'admin', null);
INSERT INTO public.user (id, username, password, "userType", idparticipant) VALUES (2, 'user', '$2b$10$q7/KioP7noxK8lRsXsaqpeHKtqrdpQsnJUYuvuP5lQ3eYSjX6BdDu', 'participant', 1);
ALTER SEQUENCE user_id_seq RESTART WITH 3;
