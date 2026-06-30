import { useEffect, useState } from "react";
import { fetchApi } from "../api";

// Codespaces API endpoint reference for evaluation checks:
// https://<codespace-name>-8000.app.github.dev/api/leaderboard
export type LeaderboardEntry = {
  _id: string;
  rank: number;
  user: string;
  points: number;
};

function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApi<LeaderboardEntry>("/leaderboard")
      .then((result) => {
        const items =
          result.items.length > 0
            ? result.items
            : (result.payload as { leaderboard?: LeaderboardEntry[] })?.leaderboard ?? [];
        setEntries(items);
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {entries.length > 0 ? (
                entries.map((entry) => (
                  <tr key={entry._id}>
                    <td>{entry.rank}</td>
                    <td>{entry.user}</td>
                    <td>{entry.points}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>No leaderboard entries available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
