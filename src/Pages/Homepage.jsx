import React from "react";
import Button from "../Components/Button";
import { PiStudent } from "react-icons/pi";
import { RiAdminLine } from "react-icons/ri";
import { RiHomeOfficeFill } from "react-icons/ri";
import { MdVerified } from "react-icons/md";
import { motion } from "framer-motion";
import Card from "../Components/Card";

const Homepage = () => {
  return (
    <>
      <div className="flex w-full p-10">
        <section className="bg-black w-[60%] h-[50vh] text-white m-5 rounded-4xl opacity-60">
          <h1 className="text-left text-5xl font-bold pt-10 pb-5 px-10">
            Welcome to the Career Gateway for Chandigarh University!
          </h1>
          <p className="text-justify text-2xl px-10 py-10">
            Chandigarh University stands as a beacon of innovation and excellence, shaping the leaders 
            of tomorrow. Our students embody a blend of creativity, dedication, and a robust foundation 
            in their disciplines. They are cultivated to push boundaries, excel in their endeavors, and make a
            meaningful impact in the world. Embark on your journey with us and unlock a future of 
            limitless possibilities. Let’s get started!
          </p>
        </section>
        <section className="w-[40%] h-[50vh] text-2xl flex flex-col justify-center items-center gap-5">
          <Button>
            <PiStudent />
            <a href='/signup'>Student</a>
          </Button>
          <Button>
            <RiAdminLine />
            <a href="/signup">Admin</a>
          </Button>
          <Button>
            <RiHomeOfficeFill />
            <a href='/signup'>Recruiter</a>
          </Button>
          <Button>
            <MdVerified />
            <a href='/signup'>Verifier</a>
          </Button>
        </section>
      </div>
      <section id='overview'>
        <h2>
          This is the overview section of the homepage, where i do yaty yata blah blah shit...
        </h2>
      </section>
    </>
  );
};

export default Homepage;
