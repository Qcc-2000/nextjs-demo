"use client";

import { Button, Tooltip } from "@nextui-org/react";
import { useEffect, useState } from "react";
import RefreshIcon from "./icons/refresh-icon";
import { AnimatePresence } from "framer-motion";

export default function Card({ content }: { content: React.ReactElement }) {
  const { key } = content;
  const [isMounted, setIsMounted] = useState(true);
  const handleMount = () => {
    setIsMounted(false);
  };
  useEffect(() => {
    if (!isMounted) {
      setTimeout(() => {
        setIsMounted(true);
      }, 1000);
    }
  }, [isMounted]);

  return (
    <div className=" flex flex-col w-full h-[300px] border border-primary rounded-lg">
      <div className="flex justify-between items-center pl-2">
        <div className="font-bold">{key}</div>
        <Tooltip content="Refresh">
          <Button
            isIconOnly
            color="default"
            variant="light"
            onClick={handleMount}
          >
            <RefreshIcon
              className={`transition hover:rotate-[360deg] hover:scale-110`}
            />
          </Button>
        </Tooltip>
      </div>

      <div className="flex justify-center items-center flex-grow">
        <AnimatePresence>{isMounted && content}</AnimatePresence>
      </div>
    </div>
  );
}
