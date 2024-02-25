"use client";
import { motion } from "framer-motion";
/**
 *
 *
 * 1. wrap with AnimatePresence
 * 2. set key prop to the motion component (for animatePresence to work)
 * 3. set exit prop
 *
 *
 * @returns
 */
export default function AnimatePresenceDemo() {
  return (
    <motion.div
      key="modal"
      className="w-[150px] h-[150px] rounded-full bg-blue-400"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
    />
  );
}
