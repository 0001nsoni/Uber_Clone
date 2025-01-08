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
