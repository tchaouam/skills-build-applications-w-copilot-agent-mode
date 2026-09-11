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

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const apiBaseUrl = getApiBaseUrl();

    fetch(`${apiBaseUrl}/api/users/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((payload) => {
        setUsers(getDataArray(payload));
        setError('');
      })
      .catch((fetchError) => {
        setError(fetchError.message);
        setUsers([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="card p-4">
      <h2 className="mb-3">Users</h2>
      <p className="text-muted mb-4">
        VITE_CODESPACE_NAME should be defined in <code>.env.local</code> for Codespaces.
      </p>

      {loading ? (
        <div className="alert alert-secondary">Loading users...</div>
      ) : error ? (
        <div className="alert alert-danger">Error: {error}</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Goal</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id ?? user._id ?? user.email}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.fitnessGoal ?? 'General fitness'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center text-muted">
                    No users found.
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

export default Users;
