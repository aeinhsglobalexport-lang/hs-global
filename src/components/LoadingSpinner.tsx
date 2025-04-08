import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="mb-4">
          <div className="text-white text-4xl font-bold tracking-wider">
            HS-GLOBALS
          </div>
        </div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "4rem" }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="h-0.5 bg-accent mx-auto"
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;
