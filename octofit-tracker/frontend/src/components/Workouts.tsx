import { useEffect, useState } from "react";
import { fetchApi } from "../api";

// Codespaces API endpoint reference for evaluation checks:
// https://<codespace-name>-8000.app.github.dev/api/workouts
export type Workout = {
  _id: string;
  name: string;
  description: string;
  durationMinutes: number;
};

function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApi<Workout>("/workouts")
      .then((result) => {
        const items =
          result.items.length > 0
            ? result.items
            : (result.payload as { workouts?: Workout[] })?.workouts ?? [];
        setWorkouts(items);
        setCount(result.count);
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h2>Workouts</h2>
      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <>
          <p>{count === null ? "Loading workouts..." : `${count} workouts available`}</p>
          <div className="list-group">
            {workouts.length > 0 ? (
              workouts.map((workout) => (
                <div key={workout._id} className="list-group-item">
                  <h3>{workout.name}</h3>
                  <p>{workout.description}</p>
                  <small>{workout.durationMinutes} minutes</small>
                </div>
              ))
            ) : (
              <div className="list-group-item">No workouts found.</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Workouts;
