import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Landing_Page from "./pages/landing_page";
import Login from "./pages/login";
import Home from "./pages/home";
import Registration from "./pages/Registration";
import Difficulty from "./pages/difficulty";
import GameController from "./pages/gameController";
import Leaderboard from "./pages/leaderboard";
import Time from "./components/time";
import Instructions from "./pages/instructions";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing_Page />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Difficulty" element={<Difficulty />} />
        <Route
          path="/GameController/:difficulty"
          element={<GameController />}
        />
        <Route path="/leaderboard" element={<Leaderboard />}></Route>
        <Route path="/instructions" element={<Instructions />}></Route>
      </Routes>

      {/* <Time /> */}
    </Router>
  );
}

export default App;
