
# EvenVuePro Frontend

## Description
EvenVuePro is the frontend part of a MERN web application that allows logged-in users to manage guests and events. Users can create, read, update, and delete guests, and associate them with events. This README is for the frontend (React) part of the application.

For the backend (Express API), you can find the repository [https://github.com/AnnaKazulak/EventVuePro-backend](link-to-backend-repo).

## Instructions to Run

1. First, clone this repository to your local machine:
git clone https://github.com/AnnaKazulak/EventVuePro-frontend.git

2. Navigate to the project directory:
cd eventvuepro-frontend

3. Install the required dependencies:
npm install


4. Create a `.env` file in the root directory and add the necessary environment variables. 
* ORIGIN, with the location of your frontend app (example, ORIGIN=https://mycoolapp.netlify.com)
* TOKEN_SECRET: used to sign auth tokens (example, TOKEN_SECRET=ilovepizza)

5. Start the application in development mode:
npm run dev


API Endpoints

## Auth Endpoints

| HTTP Verb | Path               | Request Headers               | Request Body                            | Description                 |
|-----------|--------------------|------------------------------ |---------------------------------------- |-----------------------------|
| POST      | `/api/auth/signup` | -                             | `{ email: String, password: String }`   | Create an account           |
| POST      | `/api/auth/login`  | -                             | `{ email: String, password: String }`   | Login                       |
| GET       | `/api/auth/verify` | Authorization: Bearer `<jwt>` | -                                       | Verify jwt                  |



The application will be accessible at `http://localhost:5173`.

## Event Endpoints

| HTTP Verb | Path                   | Request Headers               | Request Body                            | Description                 |
|-----------|----------------------- |-----------------------------  |---------------------------------------- |-----------------------------|
| POST      | `/api/events`          | Authorization: Bearer <jwt>   | `{ email: String, password: String }`   | Create new event            |
| GET       | `/api/events    `      | -                             | `{ email: String, password: String }`   | Login                       |
| GET       | `/api/events/:eventId` | Authorization: Bearer `<jwt>` | -                                       | Verify jwt                  |
| PUT       | `/api/events/:eventId` | Authorization: Bearer `<jwt>` | -                                       | Verify jwt                  |



## Event Endpoints

| HTTP Verb | Path                   | Request Headers               | Request Body                                            | Description          |
|-----------|------------------------|------------------------------ |-------------------------------------------------------- |--------------------- |
| POST      | `/api/events`          | Authorization: Bearer <jwt>   | `{ email: String, password: String }`                   | Create new event     |
| GET       | `/api/events`          | -                             | -                                                       | Get all events       |
| PUT       | `/api/events/:eventId` | Authorization: Bearer <jwt>   | {  title: { type: String,  required: [true, "Event title is required"] },description: String, date: Date, time: String,location: String,imageUrl: { type: String, required: false },guests: [{type: Schema.Types.ObjectId,ref: "Guest",},],}   | Update an event      |
| DELETE    | `/api/events/:eventId` | Authorization: Bearer <jwt>   | -                                                       | Delete an event      |



## Demo
You can access the deployed version of EvenVuePro on Netlify:
[https://event-vue-pro.netlify.app/](link-to-netlify-demo)

## Backend API Documentation
For information on the endpoints and API documentation, please refer to the backend repository's README.

For example, [https://github.com/AnnaKazulak/EventVuePro-backend](link-to-backend-readme) is a link to the backend README with API documentation.

