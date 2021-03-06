USE test_challenge;

CREATE TABLE rooms (
  id serial primary key,
  name varchar(25) NOT NULL
);

CREATE TABLE users (
  id serial primary key,
  handle varchar(25) NOT NULL UNIQUE
);

CREATE TABLE comments (
  id serial primary key,
  user_id integer NOT NULL REFERENCES users(id),
  body varchar(800),
  room_id integer NOT NULL REFERENCES rooms(id)
);

INSERT INTO rooms (name)
VALUES ('main');

INSERT INTO users (handle)
VALUES ('LukeS');
