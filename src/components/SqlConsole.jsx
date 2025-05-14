import React, { useState } from 'react';
import { db } from '../db/initDb';
import { formatDate } from '../utils/format';


const SQLConsole = () => {
  const [query, setQuery] = useState('SELECT * FROM patients;');
  const [result, setResult] = useState([]);
  const [columns, setColumns] = useState([]);

  const runQuery = async () => {
    try {
      const res = await db.query(query);
      setColumns(res.columns);  // optional: extract column headers
      setResult(res.rows);      // contains array of objects
    } catch (err) {
      console.error('Query Error:', err);
      alert('Invalid SQL query.');
    }
  };

  return (
    <div>
      <h2>SQL Query Console</h2>
      <div className='query-console'>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter SQL query here"
          rows={5}
          cols={50}
        />
        <br />
        <button type="submit" onClick={runQuery}>Run Query</button>
      </div>
      

      {result.length > 0 && (
        <table border="1" style={{ marginTop: '1rem' }}>
          <thead>
            <tr>
              {Object.keys(result[0]).map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.map((row, idx) => (
              <tr key={idx}>
                {Object.entries(row).map(([key, val], i) => (
                    <td key={i}>
                        {key === 'registered_date' ? formatDate(val) : val?.toString()}
                    </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SQLConsole;
