# ReelSeat - Movie Booking System

## Project Description

ReelSeat is a movie booking system built with React for the frontend, Express.js for the backend, and PostgreSQL as the database. Users can browse movies, select seats, and book tickets for the top 20 latest movies.

## Features:

- Login/Registration system built on `JWT Auth`, `HTTP cookies` and `Bcrypt`.
- Browse movie listings with details
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

### 4. Database configuration

Create a file named `.env` in server directory and add the following environment variables with your PostgreSQL connection details:
```
DB_URL=postgresql://your_username:your_password@localhost:5432/movie
```

Make an account with TMDB (https://www.themoviedb.org/), generate your API key and enter it in the `.env` file. This will be used for accessing latest movies from the TMDB Movie API.

```
API_KEY=your_tmdb_api_key
```

Finally, include your access token and refresh token secret keys, generated using bcrypt.

