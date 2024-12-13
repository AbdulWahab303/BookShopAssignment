import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "./ui/aurora-background";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/theme";
import { useUser } from "@/context/user";

function Background() {
  const r = useRouter();
  const { theme } = useTheme();
  const {session}=useUser();

  const handleViewGenres = () => {
    r.push('/genres');
  };

  return (
    <AuroraBackground theme={theme}>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
                <div className={`text-3xl md:text-7xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'} text-center`}>
          {session?`Welcom ${session.username}`:''}
        </div>
        <div className={`text-3xl md:text-7xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'} text-center`}>
          Books are cool you know.
        </div>
        <div className={`font-extralight text-base md:text-4xl ${theme === 'light' ? 'text-gray-800' : 'text-neutral-200'} py-4`}>
          Welcome to the Book Store
        </div>
        <button
          className={`rounded-full w-fit px-10 py-2 transition-colors duration-200 
            ${theme === 'light' ? 'bg-black text-white hover:bg-gray-800' : 'bg-white text-black hover:bg-gray-300'}`}
          onClick={handleViewGenres}
        >
          View Genres
        </button>
      </motion.div>
    </AuroraBackground>
  );
}

export default Background;
