import { useEffect, useState } from "react";
import { fetchApi } from "../api";

export type User = {
  _id: string;
  name: string;
  email: string;
  team: string;
};

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApi<User>("/users")
      .then((result) => {
        setUsers(result.items.length ? result.items : (result.payload as { users?: User[] })?.users ?? []);
        setCount(result.count);
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <>
          <p>{count === null ? "Loading users..." : `${count} user${count === 1 ? "" : "s"}`}</p>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Team</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.team}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3}>No users found.</td>
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

export default Users;
