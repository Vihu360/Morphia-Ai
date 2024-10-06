"use client"

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, Edit } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface BackgroundOption {
	id: string;
	src: string;
	alt: string;
}

const backgroundOptions: BackgroundOption[] = [
	{ id: 'custom', src: '/api/placeholder/100/100', alt: 'Custom upload' },
	{ id: '1', src: '/tripbike.jpg', alt: 'background 1' },
	{ id: '2', src: '/travel.jpg', alt: 'background 2' },
	{ id: '1', src: '/tripbike.jpg', alt: 'background 1' },
	{ id: '2', src: '/travel.jpg', alt: 'background 2' },
	{ id: '1', src: '/tripbike.jpg', alt: 'background 1' },
	{ id: '2', src: '/travel.jpg', alt: 'background 2' },
	{ id: '3', src: '/shoes.jpg', alt: 'background 3' },
	{ id: '4', src: '/image3.png', alt: 'background 4' },
	{ id: '5', src: '/jeans.jpg', alt: 'background 5' },
	{ id: '6', src: '/sandals.jpg', alt: 'background 6' },
	{ id: '7', src: '/worker.jpg', alt: 'background 7' },
	// Add more background options as needed
];

export default function AdCreator(): JSX.Element {
	const [selectedBackground, setSelectedBackground] = useState<string | null>(null);
	const { toast } = useToast();
	const carouselRef = useRef<HTMLDivElement>(null);

	const handleBackgroundSelect = (id: string) => {
		setSelectedBackground(id);
		toast({
			title: "Background selected",
			description: `You've selected the ${id} background.`,
		});
	};

	const handleCustomUpload = () => {
		// Implement custom upload logic here
		toast({
			title: "Custom upload",
			description: "Custom upload functionality not implemented yet.",
		});
	};

	const handleCustomizeWithAI = () => {
		toast({
			title: "Customizing with AI",
			description: "AI customization process started.",
		});
	};

	const handleGenerateCaption = () => {
		toast({
			title: "Generating caption",
			description: "AI is generating a caption for your ad.",
		});
	};

	const scrollCarousel = (direction: 'left' | 'right') => {
		if (carouselRef.current) {
			const scrollAmount = 200; // Adjust this value as needed
			carouselRef.current.scrollBy({
				left: direction === 'left' ? -scrollAmount : scrollAmount,
				behavior: 'smooth'
			});
		}
	};

	return (
		<div className=" md:h-screen md:w-screen flex flex-col md:flex-row gap-4 p-4 bg-black text-neutral-200">
			{/* left side  */}
			<div className="w-full md:w-1/2 ">

				<div className='overflow-y-scroll scrollbar-hide w-full md:h-[90%]'>

					<h2 className="text-lg font-semibold mb-2">Background ideas</h2>
					<p className="text-sm mb-4 text-neutral-200">
						Produce similar backgrounds with your own words or our suggestions.
					</p>
					<div ref={carouselRef} className="md:grid md:grid-cols-3 md:gap-5 gap-2 flex overflow-x-auto md:overflow-x-visible scrollbar-hide">
						{backgroundOptions.map((bg) => (
							<button
								key={bg.id}
								className={`flex-shrink-0 w-24 h-24 md:w-auto md:h-auto relative cursor-pointer rounded-lg overflow-hidden ${selectedBackground === bg.id ? 'border-purple-500' : ''
									}`}
								onClick={() => bg.id === 'custom' ? handleCustomUpload() : handleBackgroundSelect(bg.id)}
							>
								{bg.id === 'custom' ? (
									<div className="w-full h-24 flex items-center justify-center bg-gray-100">
										<Upload className="w-6 h-6 text-gray-400" />
									</div>
								) : (
									<Image
										src={bg.src}
										alt={bg.alt}
										width={100}
										height={100}
										layout="responsive"

									/>
								)}
							</button>
						))}
					</div>
					<button
						className="w-full mt-4 bg-purple-600 text-white py-2 rounded-lg flex items-center justify-center md:hidden"
						onClick={handleCustomizeWithAI}
					>
						<Edit className="w-4 h-4 mr-2" />
						Customize with AI
					</button>
				</div>


				<div className='hidden md:block'>
					<button
						className="w-full mt-4 bg-purple-600 text-white py-2 rounded-lg flex items-center justify-center"
						onClick={handleCustomizeWithAI}
					>
						<Edit className="w-4 h-4 mr-2" />
						Customize with AI
					</button>
				</div>

				<div>
				</div>

			</div>

			{/* right side  */}
			<div className="w-full md:w-1/2 border border-pink overflow-scroll scrollbar-hide">
				<div className="bg-pink-100 p-4 rounded-lg aspect-[9/16] relative">
					{selectedBackground ? (
						<Image
							src={backgroundOptions.find((bg) => bg.id === selectedBackground)?.src || ''}
							alt="Selected background"
							layout="fill"
							objectFit="cover"
							className="rounded-lg"
						/>
					) : (
						<div className="w-full h-full flex items-center justify-center text-gray-400">
							Select a background
						</div>
					)}
					<div className="absolute top-4 left-4 right-4 flex justify-between items-center">
						<div className="flex items-center">
							<div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full"></div>
							<span className="ml-2 text-sm font-semibold">Your Brand Here</span>
						</div>
						<span className="text-xs">Sponsored</span>
					</div>
					<div className="absolute bottom-4 left-4 right-4">
						<button className="text-sm mb-2 cursor-pointer" onClick={handleGenerateCaption}>
							Generate caption with the help of AI
						</button>
						<div className="flex justify-between">
							<button className="bg-black text-white px-4 py-2 rounded-full text-sm">
								Get offer
							</button>
							<button className="bg-white p-2 rounded-full">
								<Upload className="w-4 h-4" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
