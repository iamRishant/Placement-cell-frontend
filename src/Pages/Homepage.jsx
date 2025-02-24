import React from "react";
import { motion } from "framer-motion";
import Card from "../Components/Card";

const Homepage = () => {
  return (
    <div className="flex flex-col items-center w-full px-4 text-center">
      {/* Heading */}
      <motion.h1
        className="text-white text-4xl sm:text-5xl mt-10 font-semibold"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Welcome to Chandigarh University Placement Cell
      </motion.h1>

      {/* Created By */}
      <motion.h1
        className="text-white text-3xl sm:text-4xl mt-10 font-semibold"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Created By
      </motion.h1>

      {/* Card Section */}
      <div className="flex flex-col sm:flex-row gap-4 mt-7 items-center">
        <Card imgSrc="https://cdn.pixabay.com/photo/2024/04/12/11/59/ai-generated-8691773_640.jpg">
          Rishant
        </Card>
        <h1 className="text-2xl sm:text-3xl text-black font-bold">X</h1>
        <Card imgSrc="https://cdn.pixabay.com/photo/2024/04/12/11/59/ai-generated-8691773_640.jpg">
          Piyush
        </Card>
      </div>
    </div>
  );
};

export default Homepage;
