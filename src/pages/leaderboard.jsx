import { useState, useEffect } from "react";
import { app } from "/firebaseConfig";
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  limitToLast,
  get,
} from "firebase/database";
import { Profile_btn } from "../components/profile_btn";
import { Tab } from "@headlessui/react";

function Leaderboard() {
  const [difficulty, setDifficulty] = useState("easy");
  const [leaderboardData, setLeaderboardData] = useState([]);
  const currentUserName = localStorage.getItem("userName");

  const dbRef = getDatabase(app);

  const tabs = [
    { label: "Easy Banana", value: "easy" },
    { label: "Smooth Banana", value: "medium" },
    { label: "Slipery Banana", value: "hard" },
  ];

  const fetchLeaderboardData = async () => {
    const difficultyRef = query(
      ref(dbRef, "users"),
      orderByChild(difficulty), // Sort by the selected difficulty level
      limitToLast(10) // Limit the results to the top 10
    );

    const snapshot = await get(difficultyRef);
    if (snapshot.exists()) {
      const leaderboardData = [];
      snapshot.forEach((childSnapshot) => {
        const user = childSnapshot.val();
        leaderboardData.push({
          username: user.username,
          score: user[difficulty],
        });
      });

      // Sort the leaderboard data by score in descending order
      leaderboardData.sort((a, b) => b.score - a.score);

      setLeaderboardData(leaderboardData);
    }
  };

  useEffect(() => {
    fetchLeaderboardData();
  }, [difficulty]);

  const topThreeUsers = leaderboardData.slice(0, 3);
  const tableData = leaderboardData.slice(3);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#000000] bg-opacity-80 rounded-3xl w-11/12 h-5/6 select-none">
        <Profile_btn />

        <div className="mb-4 ml-20 text-2xl font-bold font-itim">
          <h1>test leaderboard</h1>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
