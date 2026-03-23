# Bus Tracking - Database Authentication Setup

## Overview
Your login system is now fully integrated with a SQLite database. Users can register and login with their credentials stored securely using bcrypt password hashing.

## Folder Structure
```
project-root/
├── server/
│   ├── server.js           # Main Express server
│   ├── routes/
│   │   └── auth.js         # Authentication endpoints
│   └── db/
│       └── init.js         # Database initialization
├── src/
│   ├── pages/
│   │   └── Login.tsx       # Updated Login component
│   └── lib/
│       └── api.ts          # API utility functions
└── package.json            # Updated with backend dependencies
```

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
# or
bun install
```

This will install:
- `express` - Backend server framework
- `sql.js` - Pure JavaScript SQLite database (no native compilation needed)
- `bcryptjs` - Password hashing
- `cors` - Cross-origin requests
- `concurrently` - Run multiple commands simultaneously

### 2. Running the Application

#### Option A: Run both frontend and backend together
```bash
npm run dev:all
```
This starts:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

#### Option B: Run them separately
Terminal 1 - Start the backend server:
```bash
npm run server
```

Terminal 2 - Start the frontend development server:
```bash
npm run dev
```

### 3. Database
- SQLite database file: `server/db/bus_tracking.db`
- Created automatically on first server run
- Stores user credentials with bcrypt hashing

## Features

### User Registration
- Full Name (required)
- Phone Number (optional)
- Email (required, unique)
- Password (required, minimum 6 characters)

### User Login
- Email and Password
- Secure password verification
- User data stored in browser localStorage

### Security
- Passwords hashed with bcrypt (10 rounds)
- No plain text passwords stored
- CORS enabled for development

## API Endpoints

### Register
```
POST /api/auth/register
Body: {
  "fullName": "John Doe",
  "email": "john@example.com",
  "phoneNumber": "1234567890",
  "password": "password123"
}
Response: {
  "message": "User registered successfully",
  "userId": 1,
  "email": "john@example.com"
}
```

### Login
```
POST /api/auth/login
Body: {
  "email": "john@example.com",
  "password": "password123"
}
Response: {
  "message": "Login successful",
  "userId": 1,
  "email": "john@example.com",
  "fullName": "John Doe",
  "phoneNumber": "1234567890"
}
```

## Testing the Login

1. Start both servers (frontend and backend)
2. Click "Sign Up" and create an account
3. Switch to "Login" and use your credentials
4. On successful login, you'll be redirected to home page
5. Your user data is stored in localStorage

## Troubleshooting

### "Connection error. Make sure the server is running on port 5000"
- Check if the backend server is running
- Run `npm run server` in a separate terminal
- Verify port 5000 is not in use

### "Email already registered"
- This email already has an account
- Use a different email or login instead

### Database issues
- Delete `server/db/bus_tracking.db` to reset database
- Server will recreate it on restart

## Next Steps
- Implement JWT tokens for persistent sessions
- Add email verification
- Create user profile editing
- Implement password reset functionality
- Add admin authentication
