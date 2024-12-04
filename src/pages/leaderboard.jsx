import { useState, useEffect } from "react";
import { app } from "/firebaseConfig";
import {
	getDatabase,
	ref,
	get,
	query,
	orderByChild,
	limitToLast,
} from "firebase/database"; // Add missing imports
import Profile_btn from "../components/profile_btn";
import { Tab } from "@headlessui/react";

const Leaderboard = () => {
	const [difficulty, setDifficulty] = useState("easy");
	const [leaderboardData, setLeaderboardData] = useState([]);
	const currentUserName = localStorage.getItem("userName");

	const dbRef = getDatabase(app);

	const tabs = [
		{ label: "Certified Cherry", value: "easy" },
		{ label: "Getting There", value: "medium" },
		{ label: "Tomato Crusher", value: "hard" },
	];

	const fetchLeaderboardData = async () => {
		try {
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
		} catch (error) {
			console.error("Error fetching leaderboard data:", error);
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

				<section className="flex flex-row">
					<div className="w-1/2">
						<div className="mb-4 ml-20 text-2xl font-bold font-itim">
							<div className="flex flex-col items-start justify-start">
								<h1 className="text-5xl text-white mb-4 font-bold font-itim">
									Leaderboard
								</h1>
								<label
									htmlFor="difficulty"
									className="text-3xl text-white mt-10">
									Select Difficulty:
								</label>
							</div>
							<Tab.Group>
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
											onClick={() =>
												setDifficulty(tabs[index].value)
											}>
											{tab.label}
										</Tab>
									))}
								</Tab.List>
							</Tab.Group>
						</div>

						<div className="flex flex-row justify-between w-full">
							<div className="inline-flex align-bottom items-baseline w-full ml-20">
								{topThreeUsers.map((user, index) => {
									let renderIndex =
										index === 0 ? 1 : index === 1 ? 0 : 2;
									const renderedUser = topThreeUsers.find(
										(u, i) => i === renderIndex
									);

									return (
										<div
											key={renderIndex}
											className={`relative w-44 ${
												renderIndex === 0 ? "h-60" : "h-48"
											} bg-gradient-to-b from-[#1F0541] justify-center items-center flex`}>
											<img
												src={`/${renderIndex + 1}.png`}
												srcSet={`/${renderIndex + 1}.png`}
												alt=""
												className="h-4/6"
											/>
											<p className="absolute top-0 left-0 right-0 text-right text-white font-bold font-itim text-2xl mr-1">
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
					<div className="w-1/2 h-full flex flex-col">
						<div className="relative overflow-x-auto shadow-md sm:rounded-lg mr-5 w-full h-full flex justify-center items-center mt-20">
							<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
								<thead className="text-xs text-yellow-400 uppercase bg-gray-50 dark:bg-black/70  dark:text-gray-400">
									<tr>
										<th
											scope="col"
											className="px-6 py-3 text-yellow-400">
											Username
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-yellow-400">
											Score
										</th>
									</tr>
								</thead>
								<tbody>
									{tableData?.map((data, i) => (
										<tr
											key={i}
											className="bg-white border-b dark:bg-black/50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-black">
											<th
												scope="row"
												className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
												{data.username}
											</th>
											<td className="px-6 py-4">
												<ul className="flex gap-4">
													<li>Easy</li>
													<li>Medium</li>
													<li>Hard</li>
												</ul>
												<ul className="flex gap-12">
													<li>{data.easy}</li>
													<li>{data.medium}</li>
													<li>{data.hard}</li>
												</ul>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

export default Leaderboard;
