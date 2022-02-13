/* Replace with your SQL commands */
CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    orderId integer REFERENCES orders(id),
    productId integer REFERENCES products(id),
    quantity integer NOT NULL DEFAULT 1
);