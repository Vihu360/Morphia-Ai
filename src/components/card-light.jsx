"use client";
import React from "react";
import { BackgroundGradient } from "../components/ui/background-gradient";
import { TwitterLogoIcon } from "@radix-ui/react-icons";

export function BackgroundGradientDemo() {
  return (
    <div>
      <BackgroundGradient animate={true} containerClassName="w-[150px]" className="rounded-[22px] h-24 w-[150px] max-w-sm p-4 sm:p-10 bg-transparent dark:bg-zinc-900">
        <TwitterLogoIcon/>
        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
          Twitter
				</p>
				<p className="text-sm sm:text-base text-black dark:text-neutral-200">
					Twitter is a social networking service that
				</p>
      </BackgroundGradient>
    </div>
  );
}
