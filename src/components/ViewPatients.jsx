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

  if (patients.length === 0) return <p>No patients found.</p>;

  return (
    <div>
      <h2>All Registered Patients</h2>
      <table border="1" style={{ marginTop: '1rem', width: '100%' }}>
        <thead>
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
