# Music Role-Based Auth API

A backend service for music management with role-based access control (RBAC). This API handles user authentication, authorization, and music/album management with different permission levels.

## Features

- **User Authentication** - Secure user registration and login
- **Role-Based Access Control** - Different permission levels for different user roles
- **Music Management** - Create, read, update, and delete music tracks
- **Album Management** - Organize music into albums
- **Token-Based Authorization** - JWT or similar token-based authentication
- **Database Integration** - Persistent data storage

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (based on models structure)
- **Authentication:** Role-based middleware
- **Language:** JavaScript

## Project Structure

```
.
├── server.js                 # Application entry point
├── package.json              # Dependencies and scripts
├── src/
│   ├── app.js               # Express app configuration
│   ├── controllers/         # Request handlers
│   │   ├── auth.controller.js
│   │   └── music.controller.js
│   ├── routes/              # API route definitions
│   │   ├── auth.routes.js
│   │   └── music.routes.js
│   ├── middlewares/         # Express middlewares
│   │   └── auth.middleware.js
│   ├── models/              # Data models
│   │   ├── user.model.js
│   │   ├── music.model.js
│   │   └── album.model.js
│   ├── services/            # Business logic
│   │   └── storage.service.js
│   └── db/
│       └── db.js            # Database connection
```

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/erroldmell0/music-rbac-api.git
   cd spotify-rbac-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```
   PORT=3000
   DATABASE_URL=mongodb://localhost:27017/musiclibrary
   JWT_SECRET=your_secret_key_here
   IMAGE_PRIVATE_KEY=your_private_key_here
   ```

4. **Start the server**
   ```bash
   npm start
   ```

   The server will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Music
- `GET /api/music/` - Get all music tracks
- `POST /api/upload` - Create a new track (requires auth)

### Albums
- `GET /api/music/albums` - Get all albums
- `GET api/music/albums/:albumId` - Get album by id
- `POST /api/music/album` - Create a new album (requires auth)

## Usage

### Example: User Registration
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "user1", "email": "user@example.com", "password": "password123", "role":"user"}'
```

### Example: Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```

## Development

### Running in Development Mode
```bash
npm run dev
```

### Running Tests
```bash
npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Author

Errol D'mello

