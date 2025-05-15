import React, { useState, useEffect } from 'react';
import { getDb } from '../db/initDb';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const db = await getDb();
      const result = await db.query('SELECT * FROM patients ORDER BY registered_date DESC');
      setPatients(result.rows);
      setError(null);
    } catch (err) {
      setError('Failed to fetch patients');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
    window.addEventListener('patient_db_updated', fetchPatients);
    return () => window.removeEventListener('patient_db_updated', fetchPatients);
  }, []);

  if (loading) return <div className="flex justify-center items-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>;
  if (error) return <div className="text-center py-8"><div className="text-red-600 mb-2">{error}</div><button onClick={fetchPatients} className="text-blue-500 hover:text-blue-700 underline">Try Again</button></div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Patient List</h2>
      {patients.length === 0 ? (
        <p className="text-center text-gray-500">No patients registered yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symptoms</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registered Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.gender}</td>
                  <td className="px-6 py-4 whitespace-wrap text-sm text-gray-500">{patient.symptoms}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(patient.registered_date).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PatientList; 