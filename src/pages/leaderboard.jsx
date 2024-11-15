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
    const usersRef = ref(dbRef, "users");

    try {
      const snapshot = await get(usersRef);
      if (snapshot.exists()) {
        const allUsersData = [];
        snapshot.forEach((childSnapshot) => {
          const user = childSnapshot.val();
          allUsersData.push(user); // Collect all user data
        });

        setLeaderboardData(allUsersData); // Store all data
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
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

        <div className="w-1/2">
          <div className="mb-4 ml-20 text-2xl font-bold font-itim">
            <div className="flex flex-col items-start justify-start">
              <h1 className="text-5xl text-white mb-4 font-bold font-itim">
                Leaderboard
              </h1>
              <label htmlFor="difficulty" className="text-3xl text-white mt-10">
                Select Difficulty:
              </label>
            </div>
            <Tab.Group className="mt-5">
              <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 w-2/6">
                {tabs.map((tab, index) => (
                  <Tab
                    key={index}
                    className={({ selected }) =>
                      `w-full rounded-xl text-2xl font-itim font-bold ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 p-1 ${
                        selected
                          ? "bg-white text-black shadow"
                          : "text-white hover:bg-white/[0.12] hover:text-white"
                      }`
                    }
                    onClick={() => setDifficulty(tabs[index].value)}
                  >
                    {tab.label}
                  </Tab>
                ))}
              </Tab.List>
            </Tab.Group>
          </div>

          <div className="inline-flex justify-between w-full mt-24">
            <div className="inline-flex align-bottom items-baseline w-fit ml-20">
              {topThreeUsers.map((user, index) => {
                let renderIndex = index === 0 ? 1 : index === 1 ? 0 : 2;
                const renderedUser = topThreeUsers.find(
                  (u, i) => i === renderIndex
                );

                return (
                  <div
                    key={renderIndex}
                    className={`relative w-44 ${
                      renderIndex === 0 ? "h-60" : "h-48"
                    } bg-gradient-to-b from-[#fdf57d] justify-center items-center flex rounded-md`}
                  >
                    <img
                      src={`/${renderIndex + 1}.png`}
                      srcSet={`/${renderIndex + 1}.png`}
                      alt=""
                      className="h-4/6"
                    />
                    <p className="absolute top-0 left-0 right-0 text-center text-black font-bold font-itim text-2xl mr-1">
                      {renderedUser.username}
                    </p>
                    <p className="absolute bottom-0 left-0 right-0 text-right text-white font-bold font-itim text-3xl mr-1">
                      {renderedUser.score}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-1/2">
          {/* add the table here

          fix the fucking issues in the github so this shit is not overlapping with whaterever fuck in there.
           */}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
