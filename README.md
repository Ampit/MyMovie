# Movie App

A React application that helps users find movies based on their mood. Users can watch trailers and check the availability of movies on Netflix. It features an advanced search page to choose movies.

## Features

- Browse trending movies and TV shows
- Search for movies
- Find movies based on mood
- Watch movie trailers
- Check Netflix availability

## Technologies Used

- React 18
- Redux for state management
- React Router for navigation
- Axios for API requests
- Material-UI for styling
- The Movie Database (TMDB) API for movie data

## Setup

1. Clone the repository:

   ```
   git clone https://github.com/your-username/movie-app.git
   cd movie-app
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your TMDB API key:

   ```
   REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
   ```

4. Start the development server:

   ```
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production

## Deployment

This app can be easily deployed to platforms like Vercel or Netlify. Make sure to set the environment variable for your TMDB API key in your deployment platform's settings.
