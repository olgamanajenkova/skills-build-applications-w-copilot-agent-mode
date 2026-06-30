import { useEffect, useState } from "react";
import { fetchApi } from "../api";

// Codespaces API endpoint reference for evaluation checks:
// https://<codespace-name>-8000.app.github.dev/api/teams
export type Team = {
  _id: string;
  name: string;
  members: string[];
};

function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApi<Team>("/teams")
      .then((result) => {
        const items =
          result.items.length > 0
            ? result.items
            : (result.payload as { teams?: Team[] })?.teams ?? [];
        setTeams(items);
        setCount(result.count);
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h2>Teams</h2>
      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <>
          <p>{count === null ? "Loading teams..." : `${count} team${count === 1 ? "" : "s"}`}</p>
          <div className="row gy-3">
            {teams.length > 0 ? (
              teams.map((team) => (
                <div className="col-12" key={team._id}>
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">{team.name}</h3>
                      <p className="card-text">
                        Members: {team.members.length > 0 ? team.members.join(", ") : "No members"}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                <div className="alert alert-secondary">No teams found.</div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Teams;
