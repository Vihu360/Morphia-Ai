import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { HoverBorderGradientDemo } from "./landing-page-button";

export function BackgroundLinesDemo() {
	return (
		<BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
			<h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b text-white from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
				Craft Content, <br /> Not Complications.
			</h2>
			<p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-500 dark:text-neutral-400 text-center">
				Tired of spending hours crafting the perfect ad or social media post?
				Our AI-driven platform simplifies content creation, so you can focus on what matters most—growing your business.
			</p>
			<HoverBorderGradientDemo />
		</BackgroundLines>
	);
}
