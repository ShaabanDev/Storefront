/* Replace with your SQL commands */
CREATE TABLE order (
    id SERIAL PRIMARY KEY,
    userId integer  REFERENCES user(id),
    status VARCHAR(10),
);