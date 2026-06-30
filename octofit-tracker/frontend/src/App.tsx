import { useEffect, useState } from "react";
import { fetchConfig, type AppConfig } from "./api";

function App() {
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchConfig()
      .then(setConfig)
      .catch((err) => setError(err.message));
  }, []);

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
    </main>
  );
}

export default App;
