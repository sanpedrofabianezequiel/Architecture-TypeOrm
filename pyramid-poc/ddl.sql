create table state
(
    state_id serial
        constraint state_pk
            primary key,
    name text not null,
    value integer not null
);

create unique index state_state_id_uindex
    on state (state_id);

create table state_history
(
    state_history_id serial
        constraint state_history_pk
            primary key,
    state_id integer not null
        constraint state_history_state_state_id_fk
            references state,
    created_at timestamp default CURRENT_TIMESTAMP
);

create unique index state_history_state_history_id_uindex
    on state_history (state_history_id);

create table event
(
    event_id serial
        constraint event_pk
            primary key,
    name text not null,
    value integer not null
);

create unique index event_event_id_uindex
    on event (event_id);

create table event_history
(
    event_history_id serial
        constraint event_history_pk
            primary key,
    event_id integer not null
        constraint event_history_event_event_id_fk
            references event,
    created_at timestamp default CURRENT_TIMESTAMP
);

create unique index event_history_event_history_id_uindex
    on event_history (event_history_id);

create table bill
(
    bill_id serial
        constraint bill_pk
            primary key,
    value numeric not null,
    name text not null
);

create unique index bill_bill_id_uindex
    on bill (bill_id);

create table bill_container
(
    bill_container_id serial
        constraint bill_container_pk
            primary key,
    name text not null
);

create unique index bill_container_bill_container_id_uindex
    on bill_container (bill_container_id);

create table bill_container_state
(
    bill_container_state_id serial
        constraint bill_container_state_pk
            primary key,
    bill_container_id integer not null
        constraint bill_container_state_bill_container_bill_container_id_fk
            references bill_container,
    bill_id integer not null
        constraint bill_container_state_bill_bill_id_fk
            references bill,
    quantity integer not null,
    last_update timestamp default CURRENT_TIMESTAMP
);

create unique index bill_container_state_bill_container_id_bill_id_uindex
    on bill_container_state (bill_container_id, bill_id);

create unique index bill_container_state_bill_container_state_id_uindex
    on bill_container_state (bill_container_state_id);

create table bill_history
(
    bill_history_id serial
        constraint bill_history_pk
            primary key,
    bill_id integer not null
        constraint bill_history_bill_bill_id_fk
            references bill,
    bill_container_id integer not null
        constraint bill_history_bill_container_bill_container_id_fk
            references bill_container,
    created_at timestamp default CURRENT_TIMESTAMP,
    quantity integer not null
);

create unique index bill_history_bill_history_id_uindex
    on bill_history (bill_history_id);

create function update_bill_history() returns trigger
    language plpgsql
as $$
BEGIN
    INSERT INTO bill_history (bill_id, bill_container_id, created_at, quantity)
    VALUES(NEW.bill_id,NEW.bill_container_id,now(),NEW.quantity - OLD.quantity);

    RETURN NEW;
END;
$$;

create trigger update_bill_history_trigger
    after update
    on bill_container_state
    for each row
execute procedure update_bill_history();

create function insert_bill_history() returns trigger
    language plpgsql
as $$
BEGIN
    INSERT INTO bill_history (bill_id, bill_container_id, created_at, quantity)
    VALUES(NEW.bill_id,NEW.bill_container_id,now(),NEW.quantity);

    RETURN NEW;
END;
$$;

create trigger insert_bill_history_trigger
    after insert
    on bill_container_state
    for each row
execute procedure insert_bill_history();

create function delete_bill_history() returns trigger
    language plpgsql
as $$
BEGIN
    INSERT INTO bill_history (bill_id, bill_container_id, created_at, quantity)
    VALUES(OLD.bill_id,OLD.bill_container_id,now(),OLD.quantity * -1);

    RETURN OLD;
END;
$$;

create trigger delete_bill_history_trigger
    after delete
    on bill_container_state
    for each row
execute procedure delete_bill_history();

INSERT INTO public.bill (bill_id, value, name) VALUES (1, 1, '1$');
INSERT INTO public.bill (bill_id, value, name) VALUES (3, 5, '5$');
INSERT INTO public.bill (bill_id, value, name) VALUES (4, 10, '10$');
INSERT INTO public.bill (bill_id, value, name) VALUES (5, 20, '20$');
INSERT INTO public.bill (bill_id, value, name) VALUES (6, 50, '50$');
INSERT INTO public.bill (bill_id, value, name) VALUES (7, 100, '100$');
INSERT INTO public.bill (bill_id, value, name) VALUES (2, 2, '2$');

INSERT INTO public.bill_container (bill_container_id, name) VALUES (2, 'Cash Box');
INSERT INTO public.bill_container (bill_container_id, name) VALUES (1, 'Apex Box');

INSERT INTO public.bill_container_state (bill_container_state_id, bill_container_id, bill_id, quantity, last_update) VALUES (2, 1, 1, 0, '2021-12-16 23:55:50.310000');
INSERT INTO public.bill_container_state (bill_container_state_id, bill_container_id, bill_id, quantity, last_update) VALUES (8, 2, 3, 0, '2021-12-16 15:46:10.617000');
INSERT INTO public.bill_container_state (bill_container_state_id, bill_container_id, bill_id, quantity, last_update) VALUES (7, 2, 1, 0, '2021-12-16 23:55:50.305000');
INSERT INTO public.bill_container_state (bill_container_state_id, bill_container_id, bill_id, quantity, last_update) VALUES (9, 2, 4, 0, '2021-12-16 23:47:57.248000');
INSERT INTO public.bill_container_state (bill_container_state_id, bill_container_id, bill_id, quantity, last_update) VALUES (3, 1, 3, 0, '2021-12-16 15:46:10.622000');
INSERT INTO public.bill_container_state (bill_container_state_id, bill_container_id, bill_id, quantity, last_update) VALUES (10, 2, 5, 0, '2021-12-16 15:46:10.637000');
INSERT INTO public.bill_container_state (bill_container_state_id, bill_container_id, bill_id, quantity, last_update) VALUES (4, 1, 5, 0, '2021-12-16 15:46:10.642000');
INSERT INTO public.bill_container_state (bill_container_state_id, bill_container_id, bill_id, quantity, last_update) VALUES (11, 2, 6, 0, '2021-12-16 15:46:10.645000');
INSERT INTO public.bill_container_state (bill_container_state_id, bill_container_id, bill_id, quantity, last_update) VALUES (5, 1, 6, 0, '2021-12-16 15:46:10.649000');
INSERT INTO public.bill_container_state (bill_container_state_id, bill_container_id, bill_id, quantity, last_update) VALUES (12, 2, 7, 0, '2021-12-16 15:46:10.654000');
INSERT INTO public.bill_container_state (bill_container_state_id, bill_container_id, bill_id, quantity, last_update) VALUES (6, 1, 7, 0, '2021-12-16 15:46:10.658000');
INSERT INTO public.bill_container_state (bill_container_state_id, bill_container_id, bill_id, quantity, last_update) VALUES (1, 1, 4, 0, '2021-12-16 23:47:57.256000');

INSERT INTO public.event (event_id, name, value) VALUES (1, 'NOTHING', 0);
INSERT INTO public.event (event_id, name, value) VALUES (2, 'CHEATED', 1);
INSERT INTO public.event (event_id, name, value) VALUES (3, 'REJECTED', 2);
INSERT INTO public.event (event_id, name, value) VALUES (4, 'JAMMED', 4);
INSERT INTO public.event (event_id, name, value) VALUES (5, 'FULL', 8);
INSERT INTO public.event (event_id, name, value) VALUES (6, 'STACKED_PRESENT', 16);
INSERT INTO public.event (event_id, name, value) VALUES (-1, 'UNKNOWN', -1);

INSERT INTO public.state (state_id, name, value) VALUES (1, 'OFF', 0);
INSERT INTO public.state (state_id, name, value) VALUES (2, 'IDLING', 1);
INSERT INTO public.state (state_id, name, value) VALUES (3, 'ACCEPTING', 2);
INSERT INTO public.state (state_id, name, value) VALUES (4, 'ESCROWED', 4);
INSERT INTO public.state (state_id, name, value) VALUES (5, 'STACKING', 8);
INSERT INTO public.state (state_id, name, value) VALUES (6, 'STACKED', 16);
INSERT INTO public.state (state_id, name, value) VALUES (7, 'RETURNING', 32);
INSERT INTO public.state (state_id, name, value) VALUES (8, 'RETURNED', 64);
INSERT INTO public.state (state_id, name, value) VALUES (9, 'STACK_IDLING', 17);
INSERT INTO public.state (state_id, name, value) VALUES (10, 'RETURNED_IDLING', 65);
INSERT INTO public.state (state_id, name, value) VALUES (-1, 'UNKNOWN', -1);
