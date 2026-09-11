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

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const apiBaseUrl = getApiBaseUrl();
// Fetch activities from the API
//    fetch(`${apiBaseUrl}/api/activities/`)
    fetch(`/api/activities/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((payload) => {
        setActivities(getDataArray(payload));
        setError('');
      })
      .catch((fetchError) => {
        setError(fetchError.message);
        setActivities([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="card p-4">
      <h2 className="mb-3">Activities</h2>
      <p className="text-muted mb-4">Recent training activity for Octofit users.</p>

      {loading ? (
        <div className="alert alert-secondary">Loading activities...</div>
      ) : error ? (
        <div className="alert alert-danger">Error: {error}</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Type</th>
                <th>Duration</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              {activities.length > 0 ? (
                activities.map((activity) => (
                  <tr key={activity.id ?? activity._id ?? `${activity.type}-${activity.date}`}>
                    <td>{activity.type}</td>
                    <td>{activity.durationMinutes ?? activity.duration ?? 'N/A'} min</td>
                    <td>{activity.calories ?? 'N/A'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center text-muted">
                    No activities found.
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

export default Activities;
