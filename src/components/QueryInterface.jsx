import React, { useState, useEffect } from 'react';
import { getDb } from '../db/initDb';

const DEFAULT_QUERY = 'SELECT * FROM patients;';

const QueryInterface = () => {
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [db, setDb] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDb().then(dbInstance => {
      setDb(dbInstance);
      executeQuery(dbInstance, DEFAULT_QUERY);
    }).catch(() => setError('Failed to initialize database'));
  }, []);

  const executeQuery = async (dbInstance, queryToExecute) => {
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const result = await dbInstance.query(queryToExecute);
      setResults(result);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!db) return setError('Database is not initialized yet');
    if (!query.trim()) return setError('Please enter a SQL query');
    executeQuery(db, query);
  };

  const renderResults = () => {
    if (!results?.rows?.length) return <p className="text-gray-500 italic">No results to display</p>;

    const columns = Object.keys(results.rows[0]);
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map(column => (
                <th key={column} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {results.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {columns.map(column => (
                  <td key={`${rowIndex}-${column}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {row[column]?.toString() || ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">SQL Query Console</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Enter your SQL query here..."
            className="input-field font-mono h-32 resize-y w-full px-4 py-2 border rounded-md"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? 'Running Query...' : 'Run Query'}
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {results && (
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Query Results</h3>
          </div>
          <div className="px-4 py-5 sm:p-6">{renderResults()}</div>
        </div>
      )}
    </div>
  );
};

export default QueryInterface; 