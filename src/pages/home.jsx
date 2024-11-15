import { Link } from "react-router-dom";
import { Profile_btn } from "../components/profile_btn";
import { motion } from "framer-motion";
import Logo from "../components/Logo";

const Home = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#000000]  bg-opacity-80 rounded-3xl w-11/12 h-5/6">
        <Profile_btn />

        <div className="flex items-center justify-center mt-14">
          <div className="flex items-center justify-between w-11/12">
            <div className="flex items-center">
              <ul className=" text-6xl font-itim font-bold text-white ml-10 inline-block select-none">
                <li className="transition-all hover:scale-125 m-7 w-fit">
                  <motion.div
                    className="box"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 200, damping: 5 }}
                  >
                    <Link to="/difficulty" className="flex gap-3">
                      <Logo /> Play
                    </Link>
                  </motion.div>
                </li>

                <li className="transition-all hover:scale-125 m-7 w-fit">
                  <motion.div
                    className="box"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 200, damping: 5 }}
                  >
                    <Link to="/leaderboard" className="flex gap-3">
                      {" "}
                      <Logo />
                      Leaderboard
                    </Link>
                  </motion.div>
                </li>
                <li className="transition-all hover:scale-125 m-7 w-fit">
                  <motion.div
                    className="box"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 200, damping: 5 }}
                  >
                    <Link to="/instructions" className="flex gap-3">
                      {" "}
                      <Logo />
                      Instructions
                    </Link>
                  </motion.div>
                </li>
              </ul>
            </div>
            <div>
              <img
                src="logo.png "
                alt="logg img"
                className="m-8 w-fit animate-bounce transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
