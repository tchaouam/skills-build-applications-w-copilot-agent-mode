import { useEffect, useState } from 'react';

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (codespaceName && codespaceName.trim() !== '') {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
};

const getDataArray = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data;
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results;
  }

  return [];
};

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const apiBaseUrl = getApiBaseUrl();
// Fetch leaderboard data from the API
    fetch(`${apiBaseUrl}/api/leaderboard/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((payload) => {
        setLeaderboard(getDataArray(payload));
        setError('');
      })
      .catch((fetchError) => {
        setError(fetchError.message);
        setLeaderboard([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="card p-4">
      <h2 className="mb-3">Leaderboard</h2>

      {loading ? (
        <div className="alert alert-secondary">Loading leaderboard...</div>
      ) : error ? (
        <div className="alert alert-danger">Error: {error}</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.length > 0 ? (
                leaderboard.map((entry) => (
                  <tr key={entry.rank ?? entry._id ?? entry.name}>
                    <td>{entry.rank ?? '#'}</td>
                    <td>{entry.name}</td>
                    <td>{entry.score}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center text-muted">
                    No leaderboard entries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Leaderboard;
