import React, { useState, useEffect } from 'react';
import { getDb, notifyDataChange } from '../db/initDb';

const PatientForm = () => {
  const [formData, setFormData] = useState({ name: '', age: '', gender: '', symptoms: '' });
  const [db, setDb] = useState(null);

  useEffect(() => {
    getDb().then(setDb);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!db) return alert('Database not ready');

    try {
      await db.query(
        `INSERT INTO patients (name, age, gender, symptoms, registered_date)
         VALUES ($1, $2, $3, $4, $5)`,
        [formData.name, parseInt(formData.age), formData.gender, formData.symptoms, new Date().toISOString()]
      );
      notifyDataChange();
      alert('Patient registered successfully!');
      setFormData({ name: '', age: '', gender: '', symptoms: '' });
    } catch (err) {
      alert('Error registering patient.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Register New Patient</h2>
      <div className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled hidden>Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <textarea
          name="symptoms"
          placeholder="Symptoms"
          value={formData.symptoms}
          onChange={e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
        />
        <button 
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Register Patient
        </button>
      </div>
    </form>
  );
};

export default PatientForm;
