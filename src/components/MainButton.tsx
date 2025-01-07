"use client";

import React from "react";

const MainButton = () => {
  return (
    <button
      onClick={() => {
        window.location.href = "/home";
      }}
      className="relative inline-flex  h-14  lg:h-16 overflow-hidden rounded-full p-[4px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950  lg:px-24 px-16 py-2 text-sm font-medium text-white backdrop-blur-3xl   md:text-2xl">
        Get Started
      </span>
    </button>
  );
};

export default MainButton;
