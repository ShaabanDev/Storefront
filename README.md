# Project Store Front

## Environment Variables

The project has an example env file to get started

```
PORT=3000
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=storefront_dev
POSTGRES_TEST_DB=storefront_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=1234
NODE_ENV=dev
HASH_ROUND=8
JWT_SECRET=secure
```

## Npm commands

1. Run the dev server with `npm run nodemon`
2. Run testing with `npm run test`

## Database setup

Database run on the default port: 5432
Port used: Default postgres TCP port 5432
Development database - storefront_dev
Test Database - storefront_test
User: postgres
Password: 1234

Running `npm run migrate:up ` will setup all the tables you need
Running `npm run migrate:down` will drop all the tables
