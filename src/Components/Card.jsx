import React from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

const Card = ({children,imgSrc}) => {
  return (
    <Tilt
      glareEnable={true}
      glareMaxOpacity={0.5}
      tiltMaxAngleX={15}
      tiltMaxAngleY={15}
      scale={1.05}
      transitionSpeed={400}
      className="w-72 h-96 relative overflow-hidden rounded-2xl shadow-lg cursor-pointer"
    >
      <motion.div
        className="w-full h-full"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        {/* Image */}
        <img
          src={imgSrc}
          alt="Card"
          className="w-full h-full object-cover"
        />
        
        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <p className="text-white text-2xl font-semibold">{children}</p>
        </motion.div>
      </motion.div>
    </Tilt>
  );
};

export default Card;
