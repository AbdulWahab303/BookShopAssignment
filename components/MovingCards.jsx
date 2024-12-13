"use client";

import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { useTheme } from "@/context/theme";

export function MovingCards(props) {
  const {theme,toggleTheme}=useTheme();
  return (
    (<div
      className={`h-[40rem] rounded-md flex flex-col antialiased ${
        theme === 'light' ? 'bg-blue-200' : 'bg-black'
      } dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden`}
      >
      <InfiniteMovingCards items={props.data} direction="right" speed="slow" theme={theme}/>
    </div>)
  );
}
