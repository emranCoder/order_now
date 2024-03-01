import React from "react";
import { motion } from "framer-motion";
const animation = {
  initial: { opacity: 0, y: -100 },
  animate: { opacity: 1, y: 0 },
  exit: { opactiy: 0, y: 100 },
};

export default function DropANimation({ children }) {
  return (
    <motion.div
      transition={{ duration: 0.3 }}
      variants={animation}
      initial="initial"
      animate="animate"
    >
      {children}
    </motion.div>
  );
}
