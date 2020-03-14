## Description

A shop app on MERN stack.

----
## Deploy
- Create `.env` file in the root of the project folder
- Add next variables
    ```
    MONGO_USER=<Your db user>
    MONGO_PWD=<Your db password
    MONGO_URI=mongodb://${MONGO_USER}:${MONGO_PWD}@127.0.0.1:27017
    SECRET_KEY=<your secret>
    ```
- Install `docker` and `docker-compose`
- Run `docker-compose up -d` to setup mongo container
- Run `yarn run create-superuser` and enter your admin credentials
- Install dependencies 
    ```
    yarn install
    ```
- Use `yarn start` to run server or `yarn run server` to it in watch mode.

## Use API
*API Documentation*: https://documenter.getpostman.com/view/3419284/RWTrLFpE

You can fulfill database by categories and products with your admin credentials.
