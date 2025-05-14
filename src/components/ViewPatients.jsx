import React, { useEffect, useState } from 'react';
import { db } from '../db/initDb';
import { formatDate } from '../utils/format';

const ViewPatients = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await db.query('SELECT * FROM patients ORDER BY registered_date DESC;');
        setPatients(res.rows);
      } catch (err) {
        console.error('Failed to fetch patients:', err);
        alert('Could not load patients.');
      }
    };

    fetchPatients();
  }, []);

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(patients, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'patients-export.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (patients.length === 0) return <p>No patients found.</p>;

  return (
    <div>
      <h2>All Registered Patients</h2>

      <button
        onClick={handleExport}
        style={{
          margin: '1rem 0',
          padding: '10px 20px',
          backgroundColor: '#10b981',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: '500',
        }}
      >
        Export DB
      </button>

      <table border="1" style={{ marginTop: '1rem', width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#f1f5f9' }}>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Symptoms</th>
            <th>Registered Date</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.age}</td>
              <td>{p.gender}</td>
              <td>{p.symptoms}</td>
              <td>{formatDate(p.registered_date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewPatients;
