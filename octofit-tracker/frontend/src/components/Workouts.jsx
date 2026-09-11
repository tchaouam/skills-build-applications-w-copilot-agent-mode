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

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const apiBaseUrl = getApiBaseUrl();
// Fetch workouts from the API
    fetch(`${apiBaseUrl}/api/workouts/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((payload) => {
        setWorkouts(getDataArray(payload));
        setError('');
      })
      .catch((fetchError) => {
        setError(fetchError.message);
        setWorkouts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="card p-4">
      <h2 className="mb-3">Workout Plans</h2>

      {loading ? (
        <div className="alert alert-secondary">Loading workouts...</div>
      ) : error ? (
        <div className="alert alert-danger">Error: {error}</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Level</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {workouts.length > 0 ? (
                workouts.map((workout) => (
                  <tr key={workout.id ?? workout._id ?? workout.name}>
                    <td>{workout.name}</td>
                    <td>{workout.level}</td>
                    <td>{workout.duration}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center text-muted">
                    No workouts found.
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

export default Workouts;
