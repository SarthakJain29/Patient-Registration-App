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

## Usage

1. **Patient Registration**
   - Fill in the patient details form
   - Click "Register Patient" to save the data

2. **View Patients**
   - Click on "Patient List" in the navigation
   - View all registered patients in a table format

3. **SQL Query Interface**
   - Click on "Query Interface" in the navigation
   - Enter your SQL query in the text area
   - Click "Run Query" and view results in a table format

## Challenges Faced During Development

**Using PGlite with Vite:** 
Setting up PGlite in a Vite + React app required extra configuration to handle Web Workers and WebAssembly. I had to use plugins like vite-plugin-wasm and vite-plugin-top-level-await and adjust the Vite config for compatibility.

**Build Issues:** 
While the app worked fine in development, getting it to build for production (using npm run build) caused errors due to module format and dependency optimization. Fixing these required tweaking build settings and excluding PGlite from Vite's optimization.

**Persistence and Multi-Tab Support:** 
Making the database persistent with IndexedDB and ensuring data synced across tabs was tricky. I implemented a custom event-based sync using localStorage and CustomEvent.

### Resources/References
https://pglite.dev/docs/
https://react.dev/
