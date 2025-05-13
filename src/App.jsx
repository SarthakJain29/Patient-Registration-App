import React, { useState, useEffect } from 'react';
import PatientForm from './components/PatientForm.jsx';
import SQLConsole from './components/SqlConsole.jsx';
import { initDb } from './db/initDb';
import './app.css';

function App() {
  const [view, setView] = useState('form');

  useEffect(() => {
    const initializeDb = async () => {
      try {
        await initDb();
        console.log('Database initialized');
      } catch (err) {
        console.error('Failed to initialize database:', err);
      }
    };

    initializeDb();
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Patient Registration App</h1>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setView('form')}>Register Patient</button>
        <button onClick={() => setView('sql')}>SQL Query Console</button>
      </div>

      {view === 'form' && <PatientForm />}
      {view === 'sql' && <SQLConsole />}
    </div>
  );
}

export default App;
