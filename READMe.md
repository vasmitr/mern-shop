# Description

A shop app on MERN stack.

----
# Deploy
- Create `.env` file in the root of the project folder
- Add next variables
    ```
    MONGO_URI = <your mongoDB installation>
    SECRET_KEY = <your secret>
    ```
- Install dependencies 
    ```
    npm install
    ```
- Use `npm start` to run server or `npm run server` to restart it when files change.

# Use API
*API Documentation*: https://documenter.getpostman.com/view/3419284/RWTrLFpE

1. Register an user
2. Go to the MongoDB and set `admin: true` to user you want to be admin
3. Now you can create categories and products, get them and place orders