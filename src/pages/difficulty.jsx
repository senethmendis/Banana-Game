import { Link } from "react-router-dom";
import Profile_btn from "../components/profile_btn";
import { motion } from "framer-motion";

function Difficulty() {
	return (
		<div>
			<div className="flex justify-center items-center h-screen">
				<div className="bg-[#000000] bg-opacity-80 rounded-3xl w-11/12 h-5/6">
					<Profile_btn />

					<div className="ml-10">
						<p className="text-6xl font-itim font-bold text-white m-5 select-none">
							Choose a Diffuculty
						</p>
						<div className="flex items-center w-fit">
							<ul className="list-none text-6xl font-itim font-bold text-white ml-10 inline-block">
								<li className="flex items-center transition-all hover:scale-125 m-7 w-fit">
									<motion.div
										className="inline-flex items-center"
										whileHover={{ scale: 1.01 }}
										transition={{
											type: "spring",
											stiffness: 200,
											damping: 5,
										}}>
										<img
											src="easy.png"
											alt="Bullet Point Image"
											className="w-10 h-10 mr-2"
										/>
										<Link to="/gameController/easy">Easy Banana</Link>
									</motion.div>
								</li>
								<li className="flex items-center transition-all hover:scale-125 m-7 w-fit">
									<motion.div
										className="inline-flex items-center"
										whileHover={{ scale: 1.01 }}
										transition={{
											type: "spring",
											stiffness: 200,
											damping: 5,
										}}>
										<img
											src="mid.png"
											alt="Bullet Point Image"
											className="w-10 h-10 mr-2"
										/>
										<Link to="/gameController/medium">
											Smooth Banana
										</Link>
									</motion.div>
								</li>
								<li className="flex items-center transition-all hover:scale-125 m-7 w-fit">
									<motion.div
										className="inline-flex items-center"
										whileHover={{ scale: 1.01 }}
										transition={{
											type: "spring",
											stiffness: 200,
											damping: 5,
										}}>
										<img
											src="hard.png"
											alt="Bullet Point Image"
											className="w-10 h-10 mr-2"
										/>
										<Link to="/gameController/hard">
											Slipery Banana
										</Link>
									</motion.div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Difficulty;
