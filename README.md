
# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- `npm run dev` to start the local server

# Code Overview

## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For generating JWTs used by authentication
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript 
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js/) - For hashing the passwords
- [joi](https://github.com/sideway/joie) - For Validation of fields

## Application Structure

- `src/server.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `src/db/connection.js` - This file makes connection to our MongoDB database using Monngoose
- `src/models/User.js` - This file contains the schema for the user model
- `src/routers/auth_route.js` - This file contains the routes for the authentication
- `src/routers/verify_token.js` - Verifies the JWT token
- `src/validation/auth_validation.js` - Validates various fields before sending to database

# API Endpoints

## Register

- Used to register a user.

- **URL** : `/auth/register`

- **Method** : `POST`

- **Auth required** : NO

- **Data constraints**

```json
{
    "email": "[Valid Email Address]",
    "username": "[Minimum 6 character]",
    "password": "[Minimum 6 character]"
}
```

- **Data example**

```json
{
    "email": "abc@email.com",
    "username": "sushant",
    "password": "abcd1234"
}
```

## Login

- Used to collect a Token for a registered User.

- **URL** : `/auth/login`

- **Method** : `POST`

- **Auth required** : NO

- **Data constraints**

```json
{
    "username": "[Minimum 6 character]",
    "password": "[Minimum 6 character]"
}
```

- **Data example**

```json
{
    "username": "sushant",
    "password": "abcd1234"
}
```


- ## Home

- Authenticated route by passing JWT token in header as bearer-token.

- **URL** : `/auth/home`

- **Method** : `GET`

- **Auth required** : YES

- **Data constraints**

```header
{
    "bearer-token": "valid auth token",

}
```

- **Data example**

```header
{
    "bearer-token": "authtoken",

}

