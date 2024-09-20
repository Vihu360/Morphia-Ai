import { HoverEffect } from "../components/ui/card-hover-effect";
import { useRouter } from "next/navigation";

interface Project {
	title: string;
	description: string;
	link: string; // Can be either a route or an external link
}

export function CardHoverEffect() {
	const router = useRouter();

	const handleCardClick = (link: string) => {
		if (link === "aicontentcreate") {
			router.replace("/aicontentcreate"); // Redirect to /ai
		}
		else if (link === "aiAds") {
			router.replace("/aiAds");
		}
		else if (link.startsWith("http")) {
			window.location.href = link; // For external links
		} else {
			router.replace(link); // For other internal links
		}
	};

	const modifiedProjects: Project[] = projects.map((project) => ({
		...project,
		handleClick: () => handleCardClick(project.link),
	}));

	return (
		<div className="w-full p-4">
			<HoverEffect items={modifiedProjects} className="bg-black" />
		</div>
	);
}

export const projects: Project[] = [
	{
		title: "Level up you Social Game",
		description: "Create social media posts for your handles with our advanced AI feature to gain more engagements, impressions, and be more popular.",
		link: "aicontentcreate",
	},
	{
		title: "Analyse your competitors",
		description: "Before any big game, a good sports team spends time studying their opponent. Our analysis is like a scouting report for your business—a tool for designing a game plan that helps your company succeed.",
		link: "/projects",
	},
	{
		title: "Create ADs",
		description: "Why to miss chance to create Ai based Ads that let you reach bigger auidence.",
		link: "/aiAds",
	},
	{
		title: "Netflix",
		description: "A streaming service that offers a wide variety of award-winning TV shows.",
		link: "https://netflix.com",
	},
	{
		title: "Netflix",
		description: "A streaming service that offers a wide variety of award-winning TV shows.",
		link: "https://netflix.com",
	},
	{
		title: "Netflix",
		description: "A streaming service that offers a wide variety of award-winning TV shows.",
		link: "https://netflix.com",
	},
	// ... add other projects as needed
];
