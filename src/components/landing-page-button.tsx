"use client";
import React, { useState } from "react";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export function HoverBorderGradientDemo() {

	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);

	const handleClick = () => {
		router.push("/signup");

		setIsLoading(true);

		setTimeout(() => {
			setIsLoading(false);
		}, 6000);

	}

	return (
		<div className="pt-12 flex justify-center text-center">
			<HoverBorderGradient onClick={handleClick}
				containerClassName="rounded-full"
				as="button"
				className="dark:bg-black bg-black text-white dark:text-white flex items-center space-x-2"
			>
				{isLoading ? <Loader2 className="p-1 w-16 animate-spin" /> : "Get started"}


			</HoverBorderGradient>
		</div>
	);
}
