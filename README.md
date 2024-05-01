# ReelSeat - Movie Booking System

## Project Description

ReelSeat is a movie booking system built with React for the frontend, Express.js for the backend, and PostgreSQL as the database. Users can browse movies, select seats, and book tickets for the top 20 latest movies.

## Features:

- Login/Registration system built on `JWT Auth`, `HTTP cookies` and `Bcrypt`
- Browse latest movie listings with details extracted from [The Movie Database](https://www.themoviedb.org/)
- View available seats for specific movies
- Select and book seats


## Project Setup

### 1. Prerequisites:
- Node.js and npm (or yarn) installed on your system.
- PostgreSQL server running locally.

### 2. Clone the repository
```bash
git clone https://github.com/hpuranik1794/movie-booking-system-pern.git
```

### 3. Install dependencies in both client and server
```bash
cd movie-booking-system-pern/client
npm init
cd ../server
npm init
```

Navigate to `server/package.json` and add the following to the scripts section:
```
"scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  }
```

### 4. Database configuration

Create a file named `.env` in server directory and add the following environment variables with your PostgreSQL connection details:
```
DB_URL = postgresql://your_username:your_password@localhost:5432/movie
```

Make an account with TMDB, generate your API key and include it in the `.env` file.

```
API_KEY = your_tmdb_api_key
```

Finally, add your access token and refresh token secret keys, generated using `crypto`.
```
node
> require('crypto').randomBytes(64).toString('hex')
```

### 5. Start the frontend and backend servers
```bash
cd client
npm run start
```
In a separate terminal,
```bash
cd server
npm run dev
```
This will start the backend server on port 8000 and the React development server on port 3000 (default)

Access the application at `http://localhost:3000`


## CRON Jobs
The project utilizes daily CRON jobs to automatically update the database with movies and seat information.

## Further Development

- Implement booking history.
- Integrate payment processing for ticket purchases.
- Add features like seat reservation timeout and cancellation options.

