import React from "react";
import Button from "../Components/Button";
import { PiStudent } from "react-icons/pi";
import { RiAdminLine, RiHomeOfficeFill } from "react-icons/ri";
import { MdVerified } from "react-icons/md";
import { motion } from "framer-motion";
import Card from "../Components/Card";

const Homepage = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row w-full p-6 gap-6">
        {/* Left Section */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black w-full lg:w-3/5 h-auto lg:h-[60vh] text-white rounded-3xl shadow-xl p-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to the Career Gateway for Chandigarh University!
          </h1>
          <p className="text-lg md:text-xl leading-relaxed text-gray-300">
            Chandigarh University stands as a beacon of innovation and excellence, shaping the leaders 
            of tomorrow. Our students embody a blend of creativity, dedication, and a robust foundation 
            in their disciplines. They are cultivated to push boundaries, excel in their endeavors, and make a
            meaningful impact in the world. Embark on your journey with us and unlock a future of 
            limitless possibilities. Let’s get started!
          </p>
        </section>

        {/* Right Section - Buttons */}
        <section className="w-full lg:w-2/5 flex flex-col justify-center items-center gap-4  rounded-3xl p-8 shadow-lg">
          <Button>
            <PiStudent className="mr-2" />
            <a href="/signup">Student</a>
          </Button>
          <Button>
            <RiAdminLine className="mr-2" />
            <a href="/signup">Admin</a>
          </Button>
          <Button>
            <RiHomeOfficeFill className="mr-2" />
            <a href="/signup">Recruiter</a>
          </Button>
          <Button>
            <MdVerified className="mr-2" />
            <a href="/student/verify">Verifier</a>
          </Button>
        </section>
      </div>

      {/* Overview Section */}
      {/* <section id="overview" className="w-full px-8 py-12  text-center">
        <h2 className="text-3xl font-semibold mb-4">Overview</h2>
        <p className="text-white text-lg max-w-3xl mx-auto">
          This is the overview section of the homepage, where we will provide key highlights and 
          insights about the platform and its offerings. Stay tuned for updates!
        </p>
      </section> */}
    </>
  );
};

export default Homepage;
