# Patient Registration App

A frontend-only patient registration application using PgLite for data storage. The app allows users to register new patients, query records using raw SQL, and persist patient data across page refreshes.

## Features

- Patient registration with form validation
- View all registered patients in a table format
- Execute raw SQL queries against the database
- Data persistence across page refreshes
- Synchronized data across multiple tabs
- Modern, responsive UI using Tailwind CSS

## Tech Stack

- React 18
- Vite
- PgLite for data storage
- React Router for navigation
- React Query for data synchronization
- Tailwind CSS for styling

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd patient-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Build and Deploy

1. Build the application:
   ```bash
   npm run build
   ```

2. Preview the production build:
   ```bash
   npm run preview
   ```

3. Deploy the contents of the `dist` directory to your preferred hosting platform (e.g., Vercel, Netlify)

## Usage

1. **Patient Registration**
   - Navigate to the home page
   - Fill in the patient details form
   - Click "Register Patient" to save the data

2. **View Patients**
   - Click on "Patient List" in the navigation
   - View all registered patients in a table format
   - Data is automatically sorted by registration date

3. **SQL Query Interface**
   - Click on "Query Interface" in the navigation
   - Enter your SQL query in the text area
   - Click "Run Query" to execute
   - View results in a formatted table

## Development Challenges

1. **PgLite Integration**
   - Implementing proper worker setup for PgLite
   - Handling database initialization and connection management
   - Ensuring data persistence across page refreshes

2. **Cross-Tab Synchronization**
   - Using React Query for automatic data synchronization
   - Managing concurrent database access
   - Handling stale data and cache invalidation

3. **Build Configuration**
   - Configuring Vite for proper worker bundling
   - Setting up ESM modules for PgLite worker
   - Optimizing build performance

## License

MIT
