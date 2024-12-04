import { useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import UserProfile from "./userProfile";
import GameTitle from "./GameTitle";
import { IoHomeSharp } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import Button from "./Button";

const Profile_btn = () => {
	const navigate = useNavigate();
	const userId = localStorage.getItem("userId");
	const [showProfilePopup, setShowProfilePopup] = useState(false);

	var userName = localStorage.getItem("userName");

	if (!userName) {
		userName = "Guest";
	}

	const toggleProfilePopup = () => {
		setShowProfilePopup(!showProfilePopup);
	};

	const clearUserSession = () => {
		localStorage.removeItem("userId");
		localStorage.removeItem("userName");
		navigate("/");
	};

	return (
		<div className="flex justify-between items-center ">
			<div className="ml-10 m-14 inline-flex justify-center items-center">
				<motion.div
					className="box mr-6"
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					transition={{ type: "spring", stiffness: 400, damping: 17 }}>
					<Link to="/Home">
						<IoHomeSharp
							size={50}
							color="white"
						/>
					</Link>
				</motion.div>
				{/* title img */}
				<GameTitle />
			</div>
			<Menu
				as="div"
				className="w-fit mr-28 flex-col relative">
				<motion.div
					className="box"
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 1 }}
					transition={{ type: "spring", stiffness: 400, damping: 17 }}>
					<Menu.Button className="cursor-pointer w-fit bg-yellow-300 backdrop-blur-md gap-3 flex flex-row justify-center items-center rounded-full p-2 shadow-lg">
						<FaRegUserCircle size={50} />

						<p className="text-2xl font-itim select-none font-bold m-1 ">
							{userName}
						</p>
					</Menu.Button>
				</motion.div>
				<Transition
					as={Fragment}
					enter="transition ease-out duration-200"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95">
					<Menu.Items
						as="div"
						className="absolute w-full mt-2 origin-top-right divide-y divide-gray-100 rounded-md p-1 bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
						{!userId ? (
							<>
								<Menu.Item>
									{({ active }) => (
										<Link
											to="/login"
											className={`${
												active
													? "bg-blue-500 text-white"
													: "text-gray-900"
											} group flex w-full items-center rounded-md px-2 py-2 text-xl font-bold font-itim`}>
											Log In
										</Link>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<Link
											to="/Registration"
											className={`${
												active
													? "bg-blue-500 text-white"
													: "text-gray-900"
											} group flex w-full items-center rounded-md px-2 py-2 text-xl font-bold font-itim`}>
											Register
										</Link>
									)}
								</Menu.Item>
							</>
						) : (
							<>
								<Menu.Item>
									{({ active }) => (
										<button
											onClick={toggleProfilePopup}
											className={`${
												active
													? "bg-blue-500 text-white"
													: "text-gray-900"
											} group flex w-full items-center rounded-md px-2 py-2 text-xl font-bold font-itim`}>
											Profile
										</button>
									)}
								</Menu.Item>

								<Menu.Item>
									{({ active }) => (
										<Button
											onClick={clearUserSession}
											className={`${
												active
													? "bg-red-500 text-white"
													: "text-red-600"
											} group flex w-full items-center rounded-md px-2 py-2 text-xl font-bold font-itim`}>
											Logout
										</Button>
									)}
								</Menu.Item>
							</>
						)}
					</Menu.Items>
				</Transition>
			</Menu>
			{showProfilePopup && (
				<UserProfile
					onClose={toggleProfilePopup}
					userId={userId}
				/>
			)}
		</div>
	);
};

export default Profile_btn;
