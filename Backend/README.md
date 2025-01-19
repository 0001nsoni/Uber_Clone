# Uber Clone Backend

## API Endpoints

### POST /user/register

#### Description
This endpoint is used to register a new user.

#### Request Body
The request body should be a JSON object containing the following fields:
- `fullname`: An object containing the user's first name and last name.
  - `firstname`: A string representing the user's first name. It must be at least 3 characters long.
  - `lastname`: A string representing the user's last name. It must be at least 3 characters long.
- `email`: A string representing the user's email. It must be a valid email address.
- `password`: A string representing the user's password. It must be at least 8 characters long.

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Responses

- **201 Created**
  - **Description**: User successfully registered.
  - **Body**: A JSON object containing the authentication token and user details.
  - **Example**:
    ```json
    {
      "token": "your-auth-token",
      "user": {
        "_id": "user-id",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
      }
    }
    ```

- **400 Bad Request**
  - **Description**: Invalid input or email already exists.
  - **Body**: A JSON object containing the error details.
  - **Example**:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Email",
          "param": "email",
          "location": "body"
        }
      ]
    }
    ```
    or
    ```json
    {
      "error": "Email already exists"
    }
    ```

#### Status Codes
- `201 Created`: The user was successfully registered.
- `400 Bad Request`: The request was invalid or the email already exists.

### POST /user/login

#### Description
This endpoint is used to log in an existing user.

#### Request Body
The request body should be a JSON object containing the following fields:
- `email`: A string representing the user's email. It must be a valid email address.
- `password`: A string representing the user's password. It must be at least 6 characters long.

Example:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Responses

- **200 OK**
  - **Description**: User successfully logged in.
  - **Body**: A JSON object containing the authentication token and user details.
  - **Example**:
    ```json
    {
      "token": "your-auth-token",
      "user": {
        "_id": "user-id",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
      }
    }
    ```

- **401 Unauthorized**
  - **Description**: Invalid email or password.
  - **Body**: A JSON object containing the error message.
  - **Example**:
    ```json
    {
      "message": "Invalid email or password"
    }
    ```

#### Status Codes
- `200 OK`: The user was successfully logged in.
- `401 Unauthorized`: The email or password was incorrect.

### GET /user/profile

#### Description
This endpoint is used to get the profile of the authenticated user.

#### Responses

- **200 OK**
  - **Description**: User profile retrieved successfully.
  - **Body**: A JSON object containing the user details.
  - **Example**:
    ```json
    {
      "_id": "user-id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
    ```

- **401 Unauthorized**
  - **Description**: No token provided or invalid token.
  - **Body**: A JSON object containing the error message.
  - **Example**:
    ```json
    {
      "message": "Access denied. No token provided."
    }
    ```
    or
    ```json
    {
      "message": "Invalid token."
    }
    ```

#### Status Codes
- `200 OK`: The user profile was successfully retrieved.
- `401 Unauthorized`: The token was not provided or was invalid.

### GET /user/logout

#### Description
This endpoint is used to log out the authenticated user.

#### Responses

- **200 OK**
  - **Description**: User successfully logged out.
  - **Body**: A JSON object containing a success message.
  - **Example**:
    ```json
    {
      "message": "Logged out successfully"
    }
    ```

- **401 Unauthorized**
  - **Description**: No token provided or invalid token.
  - **Body**: A JSON object containing the error message.
  - **Example**:
    ```json
    {
      "message": "Access denied. No token provided."
    }
    ```
    or
    ```json
    {
      "message": "Invalid token."
    }
    ```

#### Status Codes
- `200 OK`: The user was successfully logged out.
- `401 Unauthorized`: The token was not provided or was invalid.

### POST /captain/register

#### Description
This endpoint is used to register a new captain.

#### Request Body
The request body should be a JSON object containing the following fields:
- `fullname`: An object containing the captain's first name and last name.
  - `firstname`: A string representing the captain's first name. It must be at least 3 characters long.
  - `lastname`: A string representing the captain's last name. It must be at least 3 characters long.
- `email`: A string representing the captain's email. It must be a valid email address.
- `password`: A string representing the captain's password. It must be at least 6 characters long.
- `vehicle`: An object containing the vehicle details.
  - `color`: A string representing the vehicle's color. It must be at least 3 characters long.
  - `plate`: A string representing the vehicle's plate number. It must be at least 3 characters long.
  - `capacity`: An integer representing the vehicle's capacity. It must be at least 1.
  - `vehicleType`: A string representing the vehicle type. It must be one of `auto`, `car`, or `motorcycle`.

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "red",
    "plate": "MP 04 XV 6203",
    "capacity": 3,
    "vehicleType": "car"
  }
}
```

#### Responses

- **201 Created**
  - **Description**: Captain successfully registered.
  - **Body**: A JSON object containing the authentication token and captain details.
  - **Example**:
    ```json
    {
      "token": "your-auth-token",
      "captain": {
        "_id": "captain-id",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "vehicle": {
          "color": "red",
          "plate": "MP 04 XV 6203",
          "capacity": 3,
          "vehicleType": "car"
        }
      }
    }
    ```

- **400 Bad Request**
  - **Description**: Invalid input or email already exists.
  - **Body**: A JSON object containing the error details.
  - **Example**:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Email",
          "param": "email",
          "location": "body"
        }
      ]
    }
    ```
    or
    ```json
    {
      "error": "Captain already exists"
    }
    ```

#### Status Codes
- `201 Created`: The captain was successfully registered.
- `400 Bad Request`: The request was invalid or the email already exists.

### POST /captain/login

#### Description
This endpoint is used to log in an existing captain.

#### Request Body
The request body should be a JSON object containing the following fields:
- `email`: A string representing the captain's email. It must be a valid email address.
- `password`: A string representing the captain's password. It must be at least 6 characters long.

Example:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Responses

- **200 OK**
  - **Description**: Captain successfully logged in.
  - **Body**: A JSON object containing the authentication token and captain details.
  - **Example**:
    ```json
    {
      "token": "your-auth-token",
      "captain": {
        "_id": "captain-id",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "vehicle": {
          "color": "red",
          "plate": "MP 04 XV 6203",
          "capacity": 3,
          "vehicleType": "car"
        }
      }
    }
    ```

- **400 Bad Request**
  - **Description**: Invalid email or password.
  - **Body**: A JSON object containing the error message.
  - **Example**:
    ```json
    {
      "error": "Invalid Email or Password"
    }
    ```

#### Status Codes
- `200 OK`: The captain was successfully logged in.
- `400 Bad Request`: The email or password was incorrect.

### GET /captain/profile

#### Description
This endpoint is used to get the profile of the authenticated captain.

#### Responses

- **200 OK**
  - **Description**: Captain profile retrieved successfully.
  - **Body**: A JSON object containing the captain details.
  - **Example**:
    ```json
    {
      "captain": {
        "_id": "captain-id",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "vehicle": {
          "color": "red",
          "plate": "MP 04 XV 6203",
          "capacity": 3,
          "vehicleType": "car"
        }
      }
    }
    ```

- **401 Unauthorized**
  - **Description**: No token provided or invalid token.
  - **Body**: A JSON object containing the error message.
  - **Example**:
    ```json
    {
      "message": "Access denied. No token provided."
    }
    ```
    or
    ```json
    {
      "message": "Invalid token."
    }
    ```

#### Status Codes
- `200 OK`: The captain profile was successfully retrieved.
- `401 Unauthorized`: The token was not provided or was invalid.

### GET /captain/logout

#### Description
This endpoint is used to log out the authenticated captain.

#### Responses

- **200 OK**
  - **Description**: Captain successfully logged out.
  - **Body**: A JSON object containing a success message.
  - **Example**:
    ```json
    {
      "message": "Logout successfully"
    }
    ```

- **401 Unauthorized**
  - **Description**: No token provided or invalid token.
  - **Body**: A JSON object containing the error message.
  - **Example**:
    ```json
    {
      "message": "Access denied. No token provided."
    }
    ```
    or
    ```json
    {
      "message": "Invalid token."
    }
    ```

#### Status Codes
- `200 OK`: The captain was successfully logged out.
- `401 Unauthorized`: The token was not provided or was invalid.






# Maps API Routes Documentation

This document provides the details for the available API endpoints related to maps in the application.

## Routes

### 1. **GET `/get-coordinates`**

#### Description
This endpoint retrieves the geographic coordinates (latitude and longitude) of a given address.

#### Query Parameters
- `address`: A string representing the address you want to fetch coordinates for. It must be at least 3 characters long.

#### Example Request:

#### Responses

- **200 OK**
  - **Description**: Coordinates successfully fetched.
  - **Body**: A JSON object containing the latitude and longitude of the given address.
  - **Example**:
    ```json
    {
      "lat": 40.7128,
      "lng": -74.0060
    }
    ```

- **400 Bad Request**
  - **Description**: The `address` parameter is invalid or missing.
  - **Body**: A JSON object containing the error details.
  - **Example**:
    ```json
    {
      "errors": [
        {
          "msg": "Address must be a string with a minimum length of 3 characters.",
          "param": "address",
          "location": "query"
        }
      ]
    }
    ```

- **500 Internal Server Error**
  - **Description**: Internal server error, possibly due to a failure with the external geolocation service.

---

### 2. **GET `/get-distance-time`**

#### Description
This endpoint calculates the distance and travel time between two given locations (origin and destination).

#### Query Parameters
- `origin`: A string representing the starting location. It must be at least 3 characters long.
- `destination`: A string representing the destination location. It must be at least 3 characters long.

#### Example Request:

#### Responses

- **200 OK**
  - **Description**: Distance and travel time successfully fetched.
  - **Body**: A JSON object containing the distance and duration between the origin and destination.
  - **Example**:
    ```json
    {
      "success": true,
      "distance": "2,450 miles",
      "duration": "40 hours"
    }
    ```

- **400 Bad Request**
  - **Description**: Either the `origin` or `destination` parameter is invalid or missing.
  - **Body**: A JSON object containing the error details.
  - **Example**:
    ```json
    {
      "errors": [
        {
          "msg": "Origin must be a string with a minimum length of 3 characters.",
          "param": "origin",
          "location": "query"
        }
      ]
    }
    ```

- **500 Internal Server Error**
  - **Description**: Internal server error, possibly due to a failure with the external distance service.

---

### 3. **GET `/get-suggestions`**

#### Description
This endpoint provides autocomplete suggestions for locations based on the input query.

#### Query Parameters
- `input`: A string representing the search query. It must be at least 3 characters long.

#### Example Request:


#### Responses

- **200 OK**
  - **Description**: Autocomplete suggestions successfully fetched.
  - **Body**: A JSON array containing the suggestions.
  - **Example**:
    ```json
    [
      {
        "description": "New York, NY, USA",
        "place_id": "ChIJOwg_06VPYjARJZPu5ryJ5Y4"
      },
      {
        "description": "New Orleans, LA, USA",
        "place_id": "ChIJM6dPZzIPIIYRv-_wzO9VxOs"
      }
    ]
    ```

- **400 Bad Request**
  - **Description**: The `input` parameter is invalid or missing.
  - **Body**: A JSON object containing the error details.
  - **Example**:
    ```json
    {
      "errors": [
        {
          "msg": "Input must be a string with a minimum length of 3 characters.",
          "param": "input",
          "location": "query"
        }
      ]
    }
    ```

- **500 Internal Server Error**
  - **Description**: Internal server error, possibly due to a failure with the external autocomplete service.

---

### Status Codes

- **200 OK**: The request was successful.
- **400 Bad Request**: The request was invalid, missing required parameters, or had incorrect data.
- **500 Internal Server Error**: There was an issue with the server or an external service.

---

**Note:** All of these routes require the `authUser` middleware to ensure the user is authenticated.

# Ride Creation API

This project provides an API for creating rides with pickup and destination details, along with fare calculation based on vehicle type (auto, car, motorcycle). The API ensures authentication and validation for each ride creation request.

## Features

- **Authentication**: Requires valid authentication to create a ride.
- **Validation**: Ensures the pickup, destination, and vehicle type are valid.
- **Fare Calculation**: Calculates fare based on vehicle type, distance, and time.

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for Node.js.
- **Express Validator**: For request validation.
- **JWT**: For authentication and token verification.
- **MongoDB**: Database for storing ride data.
  
## API Endpoint

### POST `/rides/create`

This endpoint creates a new ride. It requires the following fields in the request body:

#### Request Body

- **pickup** (string): The pickup address (minimum length of 3 characters).
- **destination** (string): The destination address (minimum length of 3 characters).
- **vehicleType** (string): The type of vehicle for the ride. Accepted values are: `'auto'`, `'car'`, `'motorcycle'`.

#### Example Request

```json
{
  "pickup": "Aray College jaipur",
  "destination": "Aandhi, Rajasthan, India",
  "vehicleType": "car"
}
```

#### Successful Response
```json
{
 "message": "Ride created successfully",
  "ride": {
    "_id": "678cb961c78a07850482b09b",
    "user": "678207e858971e6aafb95bd8",
    "pickup": "Aray College jaipur",
    "destination": "Aandhi, Rajasthan, India",
    "fare": 866,
    "status": "pending",
    "distance": 39.2,
    "duration": 76,
    "__v": 0
}
```

#### Error Response

```json
{
  "errors": [
    {
      "msg": "Invalid Pickup address",
      "param": "pickup",
      "location": "body"
    }
  ]
}
```