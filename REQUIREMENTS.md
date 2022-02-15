# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Create - [POST] /api/products/create - user access token required. id[optional], name, price.

- Index - [GET] /api/products/index - Returns all products in DB

- Show - [GET] /api/products/:id - Returns product details

#### Users

- Create New user - [POST] /api/users/create - id, firstname, lastname, password.
  Returns auth token and user details

- Index - [GET] /api/users/index - return all users.

- Show - [GET] /api/users/:id - user access token required - returns user details

#### Orders

- Show - [GET] /api/orders/id - user access token required. Returns the order details for given user id

## Data Shapes

#### Product

- id
- name
- price

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- userid
- status of order (active or complete)

## Database Schema

#### Product

    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    price DECIMAL(10,2) NOT NULL

#### User

    id SERIAL PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100),
    password TEXT

#### Order

    Orders table

    id SERIAL PRIMARY KEY,
    userId integer  REFERENCES users(id),
    orderStatus VARCHAR(10) DEFAULT 'active'

    Order Products table

    id SERIAL PRIMARY KEY,
    orderId integer REFERENCES orders(id),
    productId integer REFERENCES products(id),
    quantity integer NOT NULL DEFAULT 1
