"use client";
import React from "react";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { useRouter } from "next/navigation";

export function HoverBorderGradientDemo() {

	const router = useRouter();

	const handleClick = () => {
		router.push("/signup");
	}

	return (
		<div className="pt-12 flex justify-center text-center">
			<HoverBorderGradient onClick={handleClick}
				containerClassName="rounded-full"
				as="button"
				className="dark:bg-black bg-black text-white dark:text-white flex items-center space-x-2"
			>
				<span>Get Started</span>
			</HoverBorderGradient>
		</div>
	);
}

const AceternityLogo = () => {
	return (
		<svg
			width="66"
			height="65"
			viewBox="0 0 66 65"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className="h-3 w-3 text-white dark:text-white"
		>
			<path
				d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
				stroke="currentColor"
				strokeWidth="15"
				strokeMiterlimit="3.86874"
				strokeLinecap="round"
			/>
		</svg>
	);
};
