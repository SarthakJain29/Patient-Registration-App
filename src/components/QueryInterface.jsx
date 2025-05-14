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
    const initializeDb = async () => {
      try {
        const dbInstance = await getDb();
        setDb(dbInstance);
        // Execute default query on load
        executeQuery(dbInstance, DEFAULT_QUERY);
      } catch (err) {
        setError('Failed to initialize database');
      }
    };
    initializeDb();
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
    } finally {
      setLoading(false);
    }
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!db) {
      setError('Database is not initialized yet');
      return;
    }

    if (!query.trim()) {
      setError('Please enter a SQL query');
      return;
    }

    executeQuery(db, query);
  };

  const renderResults = () => {
    if (!results || !results.rows || results.rows.length === 0) {
      return <p className="text-gray-500 italic">No results to display</p>;
    }

    const columns = Object.keys(results.rows[0]);

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {results.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50 transition-colors duration-150">
                {columns.map((column) => (
                  <td
                    key={`${rowIndex}-${column}`}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
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
          <div className="relative">
            <textarea
              value={query}
              onChange={handleQueryChange}
              placeholder="Enter your SQL query here..."
              className="input-field font-mono h-32 resize-y"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Running Query...
                </>
              ) : (
                'Run Query'
              )}
            </button>
          </div>
        </form>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {results && (
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Query Results
            </h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            {renderResults()}
          </div>
        </div>
      )}
    </div>
  );
};

export default QueryInterface; 