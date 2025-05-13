import React, { useState } from 'react';
import {db} from '../db/initDb';


const PatientForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    symptoms: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, age, gender, symptoms } = formData;
    const registered_date = new Date().toISOString();

    try {
      await db.query(
        `INSERT INTO patients (name, age, gender, symptoms, registered_date)
         VALUES ($1, $2, $3, $4, $5)`,
        [name, parseInt(age), gender, symptoms, registered_date]
      );

      alert('Patient registered successfully!');
      setFormData({
        name: '',
        age: '',
        gender: 'Male',
        symptoms: '',
      });
    } catch (err) {
      console.error('Error inserting patient:', err);
      alert('Error registering patient.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register New Patient</h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
        required
      />

      <select name="gender" value={formData.gender} onChange={handleChange}>
      <option value="" hidden>Select your option</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>

      <textarea
        name="symptoms"
        placeholder="Symptoms"
        value={formData.symptoms}
        onChange={handleChange}
      />

      <button type="submit">Register</button>
    </form>
  );
};

export default PatientForm;
