"use client";
import { motion } from "framer-motion";

export default function Basic() {
  return (
    <motion.div
      className="w-[150px] h-[150px] rounded-full bg-blue-400"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        type: "spring",
        repeat: 1,
        repeatType: "reverse",
      }}
    />
  );
}
