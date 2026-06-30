import { useEffect, useState } from "react";
import { fetchApi } from "../api";

export type Activity = {
  _id: string;
  userId: string;
  type: string;
  durationMinutes: number;
  distanceKm: number;
  points: number;
  date: string;
};

function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApi<Activity>("/activities")
      .then((result) => {
        const items =
          result.items.length > 0
            ? result.items
            : (result.payload as { activities?: Activity[] })?.activities ?? [];
        setActivities(items);
        setCount(result.count);
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h2>Activities</h2>
      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <>
          <p>{count === null ? "Loading activities..." : `${count} activities`}</p>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Type</th>
                  <th>Duration</th>
                  <th>Distance</th>
                  <th>Points</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.length > 0 ? (
                  activities.map((activity) => (
                    <tr key={activity._id}>
                      <td>{activity.userId}</td>
                      <td>{activity.type}</td>
                      <td>{activity.durationMinutes} min</td>
                      <td>{activity.distanceKm} km</td>
                      <td>{activity.points}</td>
                      <td>{new Date(activity.date).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6}>No activities found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default Activities;
