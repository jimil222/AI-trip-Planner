# AI Trip Planner

AI Trip Planner is a responsive and user-friendly web application designed to help users plan trips effortlessly. The application leverages AI-powered APIs and modern web technologies to deliver personalized trip recommendations and itineraries.

## Features

- **Dynamic Trip Planning:**

  - Users can input location, number of days, budget preferences (cheap, moderate, luxury), and number of travelers.
  - Automatically fetches and generates personalized trip details.

- **Location Suggestions and Navigation:**

  - Integrated with Google Autocomplete API for location suggestions.
  - Google Maps API provides navigation links for destinations.

- **Hotel Recommendations:**

  - Fetches hotel recommendations using the Gemini API based on user inputs.
  - Displays hotel images with the help of the Google Photos API.

- **User Data Management:**

  - Securely stores user trip data in Firebase for real-time updates.
  - Trip history functionality allows users to retrieve and manage previous trips.

- **Detailed Itineraries:**

  - Displays daily itineraries and recommended hotels based on user preferences.

## Technology Stack

### Frontend:

- ![React.js](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white): For building the user interface.
- ![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white): For fast and optimized development.
- ![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-38B2AC?logo=tailwind-css&logoColor=white): For styling the UI.

### Backend and APIs:

- ![Firebase](https://img.shields.io/badge/-Firebase-FFCA28?logo=firebase&logoColor=black): For secure data storage and real-time updates.
- **Google APIs:**
  - ![Google Autocomplete API](https://img.shields.io/badge/-Autocomplete%20API-4285F4?logo=google&logoColor=white): For location suggestions.
  - ![Google Photos API](https://img.shields.io/badge/-Photos%20API-34A853?logo=google&logoColor=white): For displaying images of hotels and locations.
  - ![Google Maps API](https://img.shields.io/badge/-Maps%20API-F4B400?logo=google&logoColor=black): For navigation and mapping functionalities.
- ![Gemini API](https://img.shields.io/badge/-Gemini%20API-0078D4?logo=azure-devops&logoColor=white): For fetching personalized trip details and hotel recommendations.

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/ai-trip-planner.git
   cd ai-trip-planner
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the environment variables:

   - Create a `.env` file in the root directory and add the following:
     ```env
     VITE_GOOGLE_PLACE_API_KEY=your-google-place-api-key
     VITE_GOOGLE_GEMINI_AI_API_KEY=your-google-gemini-ai-api-key
     VITE_GOOGLE_AUTH_CLIENT=your-google-auth-client
     ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the application in your browser:

   - The app will be accessible at `http://localhost:5173`.

## Acknowledgments

- [React.js](https://reactjs.org/) for the frontend framework.
- [Vite](https://vitejs.dev/) for fast and optimized development.
- [Tailwind CSS](https://tailwindcss.com/) for styling the UI.
- [Firebase](https://firebase.google.com/) for backend services.
- [Google APIs](https://console.cloud.google.com/):
  - Autocomplete API for location suggestions.
  - Photos API for displaying images.
  - Maps API for navigation.
- [Gemini API](https://gemini.docs.api/) for trip planning and hotel recommendations.

---

