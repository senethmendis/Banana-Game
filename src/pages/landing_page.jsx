import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import GameTitle from "../components/GameTitle";
import Button from "../components/Button";

const Landing_Page = () => {
	const navigate = useNavigate();
	const userId = localStorage.getItem("userId");

	useEffect(() => {
		if (userId) {
			// User is logged in
			navigate("/home");
		} else {
			// User is not logged in
			console.log("User is not logged in.");
		}
	}, [userId, navigate]); // Add navigate to the dependencies array

	const directToLogin = () => {
		navigate("/Login");
	};

	const directToRegistration = () => {
		navigate("/Registration");
	};

	const directToHome = () => {
		navigate("/home");
	};

	// Split the text into an array of letters

	return (
		<div className="flex justify-center items-center h-screen">
			<div className="bg-[#000000] bg-opacity-80 rounded-3xl w-11/12 h-5/6 flex justify-center items-center">
				<div className="flex justify-center items-center">
					<div className="flex flex-col items-center">
						<div className="flex items-center">
							<p className="text-6xl mr-5 select-none font-itim font-bold">
								<motion.span
									initial={{ y: -100, opacity: 0 }} // Initial position above the container
									animate={{ y: 0, opacity: 1 }} // Animation to drop down and fade in
									transition={{ delay: 0.1 }} // Delay each letter animation
								>
									<GameTitle />
								</motion.span>
							</p>
						</div>

						<br />
						<motion.div
							className="box"
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{
								duration: 0.8,
								delay: 0.5,
								ease: [0, 0.71, 0.2, 1.01],
							}}>
							<h1 className="text-4xl mb-10 font-itim select-none text-white">
								Ready to play!
							</h1>
						</motion.div>

						<motion.div
							className="flex flex-col items-center w-full"
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{
								duration: 0.8,
								delay: 0.5,
								ease: [0, 0.71, 0.2, 1.01],
							}}>
							<div className="mb-5 w-full flex items-center justify-center space-x-10">
								<Button
									type="button"
									onClick={directToLogin}>
									Login
								</Button>

								<Button
									type="button"
									onClick={directToRegistration}>
									Register
								</Button>

								<Button
									type="button"
									onClick={directToHome}>
									Play as Guest
								</Button>
							</div>
						</motion.div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Landing_Page;
