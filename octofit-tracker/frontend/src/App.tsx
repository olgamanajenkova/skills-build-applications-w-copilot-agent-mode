import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Activities from "./components/Activities";
import Leaderboard from "./components/Leaderboard";
import Teams from "./components/Teams";
import Users from "./components/Users";
import Workouts from "./components/Workouts";

function App() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link${isActive ? " active" : ""}`;

  return (
    <BrowserRouter>
      <main className="container py-4">
        <header className="mb-4">
          <h1>OctoFit Tracker</h1>
          <p className="text-muted">React 19 + Vite frontend with client-side routing.</p>
        </header>

        <nav>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <NavLink end to="/" className={navLinkClass}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/users" className={navLinkClass}>
                Users
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/activities" className={navLinkClass}>
                Activities
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/teams" className={navLinkClass}>
                Teams
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/leaderboard" className={navLinkClass}>
                Leaderboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/workouts" className={navLinkClass}>
                Workouts
              </NavLink>
            </li>
          </ul>
        </nav>

        <section className="mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </section>
      </main>
    </BrowserRouter>
  );
}

export default App;
