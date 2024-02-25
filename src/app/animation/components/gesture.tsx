"use client";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function Gesture() {
  return (
    <>
      {/* <motion.button
        className="border border-black rounded-md p-2"
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.5 },
        }}
        whileTap={{ scale: 0.9 }}
      >
        Hover me
      </motion.button> */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 300 }}
        dragSnapToOrigin={true}
        onDragEnd={(event, info) => {
          toast("Drag event has been created");
        }}
      >
        <div className="w-20 h-20 rounded-full bg-blue-400" />
      </motion.div>
    </>
  );
}
