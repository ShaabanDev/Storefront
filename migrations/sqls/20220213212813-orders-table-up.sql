/* Replace with your SQL commands */
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    userId integer  REFERENCES users(id),
    orderStatus VARCHAR(10) DEFAULT 'active'
);