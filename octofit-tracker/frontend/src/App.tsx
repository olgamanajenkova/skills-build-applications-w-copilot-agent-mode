import { useEffect, useState } from "react";
import { fetchConfig, type AppConfig } from "./api";

function App() {
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [usersCount, setUsersCount] = useState<number | null>(null);
  const [activitiesCount, setActivitiesCount] = useState<number | null>(null);

  useEffect(() => {
    fetchConfig()
      .then(setConfig)
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    if (!config) return;

    const fetchUsers = async () => {
      const response = await fetch(`/api/users`);
      const data = await response.json();
      setUsersCount(data.count ?? null);
    };

    const fetchActivities = async () => {
      const response = await fetch(`/api/activities`);
      const data = await response.json();
      setActivitiesCount(data.count ?? null);
    };

    fetchUsers().catch((err) => setError(err.message));
    fetchActivities().catch((err) => setError(err.message));
  }, [config]);

  return (
    <main>
      <h1>OctoFit Tracker</h1>
      <p>React 19 + Vite frontend running on port 5173.</p>
      <section>
        <h2>Backend Configuration</h2>
        {error ? (
          <p style={{ color: "red" }}>Error loading config: {error}</p>
        ) : config ? (
          <div>
            <p>
              <strong>API Base URL:</strong> {config.apiBaseUrl}
            </p>
            <p>
              <strong>Codespace Name:</strong> {config.codespaceName ?? "none"}
            </p>
          </div>
        ) : (
          <p>Loading config…</p>
        )}
      </section>

      <section>
        <h2>Usage Summary</h2>
        <p>Registered users: {usersCount ?? "loading..."}</p>
        <p>Logged activities: {activitiesCount ?? "loading..."}</p>
      </section>
    </main>
  );
}

export default App;
