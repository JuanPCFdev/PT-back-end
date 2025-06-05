# Login Server with Map Coordinates

This is a simple server built with Node.js and Express that handles login and returns map coordinates.

## Requirements

- Node.js (version 12 or higher)
- npm (included with Node.js)

## Installation

1. Clone this repository
2. Install dependencies:
```bash
npm install
```

## Usage

1. Start the server:
```bash
npm start
```

2. The server will be running at `http://localhost:3000`

## Endpoints

### POST /login

Login endpoint.

**Request body:**
```json
{
    "email": "usuario@ejemplo.com",
    "password": "123456"
}
```

**Successful response:**
```json
{
    "success": true,
    "message": "Login successful",
    "coordinates": {
        "lat": 4.60971,
        "lng": -74.08175
    }
}
```

**Error response:**
```json
{
    "success": false,
    "message": "Invalid email or password"
}
```

## Test Credentials

- Email: usuario@ejemplo.com
- Password: 123456 