create table hotel
(
    id            serial           not null
        constraint hotel_pk
            primary key,
    numberofstars double precision not null,
    name          varchar(255)     not null
);

create table participant
(
    id          serial       not null
        constraint participant_pk
            primary key,
    name        varchar(255) not null,
    surname     varchar(255) not null,
    dob         date         not null,
    email       varchar(255) not null,
    phonenumber varchar(255)
);

create table trip
(
    id              serial           not null
        constraint trip_pk
            primary key,
    name            varchar(255)     not null,
    idhotel         integer          not null
        constraint table_3_table_2
            references hotel,
    price           double precision not null,
    startoftripdate date             not null
);

create table tripparticipant
(
    id            serial  not null
        constraint tripparticipant_pk
            primary key,
    idtrip        integer not null
        constraint tripparticipant_trip
            references trip,
    idparticipant integer not null
        constraint tripparticipant_participant
            references participant,
    dateofpayment date,
    discount      double precision
);

create table "user"
(
    id            serial       not null
        constraint user_pk
            primary key,
    username      varchar(255) not null,
    password      varchar(255) not null,
    "userType"    varchar(255) not null,
    idparticipant integer
);

create unique index user_id_uindex
    on "user" (id);

create unique index user_username_uindex
    on "user" (username);

