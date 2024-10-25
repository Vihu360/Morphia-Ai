import { HoverEffect } from "../components/ui/card-hover-effect";
import { useRouter } from "next/navigation";

interface Project {
	id: number,
	title: string;
	description: string;
	link: string;
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
		handleClick: () => handleCardClick(project.link), key: project.id,
	}));

	return (
		<div className="w-full p-4">
			<HoverEffect items={modifiedProjects} className="bg-black" />
		</div>
	);
}

export const projects: Project[] = [
	{
		id: 1,
		title: "Level up you Social Game",
		description: "Create social media posts for your handles with our advanced AI feature to gain more engagements, impressions, and be more popular.",
		link: "aicontentcreate",
	},
	{
		id: 2,
		title: "Analyse your competitors",
		description: "Before any big game, a good sports team spends time studying their opponent. Our analysis is like a scouting report for your business—a tool for designing a game plan that helps your company succeed.",
		link: "/projects",
	},
	{
		id: 3,
		title: "Create ADs",
		description: "Why to miss chance to create Ai based Ads that let you reach bigger auidence.",
		link: "/createads",
	},
	{
		id: 4,
		title: "Social Media Trend Analyzer",
		description: "A streaming service that offers a wide variety of award-winning TV shows.",
		link: "/socialmediatrendanalyser",
	},
	{
		id: 5,
		title: "Get all DM at one place",
		description: "A streaming service that offers a wide variety of award-winning TV shows.",
		link: "/allmessages",
	},
	{
		id: 6,
		title: "Create SEO based content",
		description: "A streaming service that offers a wide variety of award-winning TV shows.",
		link: "/seo",
	},
	
];
