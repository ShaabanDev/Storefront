/* Replace with your SQL commands */
CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    orderId integer REFERENCES order(id),
    productId integer REFERENCES product(id),
    quantity integer NOT NULL DEFAULT 1
);