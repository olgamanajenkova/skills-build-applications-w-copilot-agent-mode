import { getApiInfo } from "../api";

function Home() {
  const { apiBaseUrl, codespaceName, isFallback } = getApiInfo();

  return (
    <section>
      <h2>Welcome to OctoFit Tracker</h2>
      <p>
        This frontend uses React Router for navigation and Vite environment variables via
        <code>import.meta.env.VITE_CODESPACE_NAME</code>.
      </p>

      <div className="card mb-4">
        <div className="card-body">
          <h3 className="card-title">API configuration</h3>
          <p className="card-text">
            <strong>API Base URL:</strong> <code>{apiBaseUrl}</code>
          </p>
          <p className="card-text">
            <strong>Codespace Name:</strong> {codespaceName ?? "not configured"}
          </p>
          {isFallback ? (
            <p className="text-warning">
              VITE_CODESPACE_NAME is unset. The app is using the local fallback API URL.
            </p>
          ) : (
            <p className="text-success">Codespace-aware API base URL is configured.</p>
          )}
        </div>
      </div>

      <div className="alert alert-info">
        Define <code>VITE_CODESPACE_NAME</code> in <code>octofit-tracker/frontend/.env.local</code> when using Codespaces.
      </div>
    </section>
  );
}

export default Home;
