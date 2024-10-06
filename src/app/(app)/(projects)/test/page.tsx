"use client"

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Upload, Edit, Move } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface BackgroundOption {
	id: string;
	src: string;
	alt: string;
}

const backgroundOptions: BackgroundOption[] = [
	{ id: 'custom', src: '/api/placeholder/100/100', alt: 'Custom upload' },
	{ id: '1', src: '/tripbike.jpg', alt: 'background 1' },
	{ id: '2', src: '/leafs.jpg', alt: 'background 2' },
	{ id: '3', src: '/sunview.jpg', alt: 'background 3' },
	{ id: '4', src: '/baloon.jpg', alt: 'background 4' },
	{ id: '5', src: '/jeans.jpg', alt: 'background 5' },
	{ id: '6', src: '/sandals.jpg', alt: 'background 6' },
	{ id: '7', src: '/worker.jpg', alt: 'background 7' },
	{ id: '8', src: '/lips.jpg', alt: 'background 8' },
	{ id: '9', src: '/stadium.jpg', alt: 'background 9' },
	{ id: '10', src: '/tech.jpg', alt: 'background 10' },
	{ id: '11', src: '/image3.png', alt: 'background 11' },
	{ id: '12', src: '/shoes.jpg', alt: 'background 12' },
	{ id: '13', src: '/travel.jpg', alt: 'background 13' },


];

const aspectRatios = {
	'Instagram Story': '9/16',
	'Instagram Post': '1/1',
	'Facebook Post': '16/9',
	'Facebook Story': '9/16',
	'Square': '1/1',
};

export default function AdCreator(): JSX.Element {
	const [selectedBackground, setSelectedBackground] = useState<string | null>(null);
	const [uploadedImage, setUploadedImage] = useState<string | null>(null);
	const [selectedAspectRatio, setSelectedAspectRatio] = useState<string>('Instagram Story');
	const [isEditing, setIsEditing] = useState(false);
	const [captionPosition, setCaptionPosition] = useState({ x: 0, y: 0 });
	const [captionSize, setCaptionSize] = useState(16);
	const [captionColor, setCaptionColor] = useState('#FFFFFF');
	const [captionWidth, setCaptionWidth] = useState(200);
	const { toast } = useToast();
	const carouselRef = useRef<HTMLDivElement>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const captionRef = useRef<HTMLDivElement>(null);
	const resizeStartXRef = useRef(0);
	const initialWidthRef = useRef(0);

	useEffect(() => {
		if (isEditing && captionRef.current) {
			const handleDrag = (e: MouseEvent) => {
				setCaptionPosition(prev => ({
					x: prev.x + e.movementX,
					y: prev.y - e.movementY // Inverting the y-axis movement
				}));
			};

			const handleResize = (e: MouseEvent) => {
				const deltaX = e.clientX - resizeStartXRef.current;
				const newWidth = Math.max(100, initialWidthRef.current + deltaX); // Minimum width of 100px
				setCaptionWidth(newWidth);
			};

			const handleMouseDown = (e: MouseEvent) => {
				const target = e.target as HTMLElement;
				if (target.classList.contains('resize-handle')) {
					resizeStartXRef.current = e.clientX;
					initialWidthRef.current = captionWidth;
					document.addEventListener('mousemove', handleResize);
					document.addEventListener('mouseup', handleMouseUp);
				} else {
					document.addEventListener('mousemove', handleDrag);
				}
			};

			const handleMouseUp = () => {
				document.removeEventListener('mousemove', handleDrag);
				document.removeEventListener('mousemove', handleResize);
			};

			captionRef.current.addEventListener('mousedown', handleMouseDown);
			document.addEventListener('mouseup', handleMouseUp);

			return () => {
				captionRef.current?.removeEventListener('mousedown', handleMouseDown);
				document.removeEventListener('mouseup', handleMouseUp);
				document.removeEventListener('mousemove', handleDrag);
				document.removeEventListener('mousemove', handleResize);
			};
		}
	}, [isEditing, captionWidth]);

	const handleBackgroundSelect = (id: string) => {
		setSelectedBackground(id);
		setUploadedImage(null);

	};

	const handleCustomUpload = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const result = e.target?.result as string;
				setUploadedImage(result);
				setSelectedBackground(null);

			};
			reader.readAsDataURL(file);
		}
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

	const handleAspectRatioChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedAspectRatio(event.target.value);
	};

	const toggleEditing = () => {
		setIsEditing(!isEditing);
	};

	return (
		<div className="h-screen w-screen flex flex-col md:flex-row gap-4 p-4 bg-black text-neutral-200">
			{/* Left side */}
			<div className="w-full h-full md:w-1/2 overflow-y-auto scrollbar-hide">

				<h2 className="text-lg font-semibold mb-2">Background ideas</h2>
				<p className="text-sm mb-4 text-neutral-200">
					Produce similar backgrounds with your own words or our suggestions.
				</p>

				<div className='w-full h-[80%] overflow-y-auto scrollbar-hide'>
					<div ref={carouselRef} className="grid grid-cols-3 gap-5">
						{backgroundOptions.map((bg) => (
							<button
								key={bg.id}
								className={`w-full aspect-square relative cursor-pointer rounded-lg overflow-hidden ${selectedBackground === bg.id ? 'border-2 border-purple-500' : ''
									}`}
								onClick={() => bg.id === 'custom' ? handleCustomUpload() : handleBackgroundSelect(bg.id)}
							>
								{bg.id === 'custom' ? (
									<div className="w-full h-full flex items-center justify-center bg-gray-100">
										<Upload className="w-6 h-6 text-gray-400" />
									</div>
								) : (
									<Image
										src={bg.src}
										alt={bg.alt}
										layout="fill"
										objectFit="cover"
									/>
								)}
							</button>
						))}
					</div>
				</div>

				<input
					type="file"
					ref={fileInputRef}
					className="hidden"
					accept="image/*"
					onChange={handleFileChange}
				/>

				<button
					className="w-full mt-4 bg-purple-600 text-white py-2 rounded-lg flex items-center justify-center"
					onClick={handleCustomizeWithAI}
				>
					<Edit className="w-4 h-4 mr-2" />
					Customize with AI
				</button>

			</div>

			{/* Right side */}
			<div className="w-full md:w-1/2 overflow-y-auto flex flex-col scrollbar-hide">
				<div className="mb-4 flex items-center">
					<select
						className="w-full p-2 rounded bg-gray-700 text-white mr-2"
						onChange={handleAspectRatioChange}
						value={selectedAspectRatio}
					>
						{Object.keys(aspectRatios).map((ratio) => (
							<option key={ratio} value={ratio}>
								{ratio}
							</option>
						))}
					</select>
					<button
						className={`p-2 rounded ${isEditing ? 'bg-purple-600' : 'bg-gray-700'} text-white`}
						onClick={toggleEditing}
					>
						<Edit className="w-4 h-4" />
					</button>
				</div>
				<div className="flex-grow flex items-center justify-center border">
					<div
						className={`bg-gray-800 rounded-lg relative border`}
						style={{
							width: '100%',
							maxWidth: '300px',
							aspectRatio: aspectRatios[selectedAspectRatio as keyof typeof aspectRatios],
						}}
					>
						{/* Background and Overlay Image Layer */}
						<div style={{ position: 'relative', width: '100%', height: '100%' }}>
							{uploadedImage ? (
								<Image
									src={uploadedImage}
									alt="Uploaded background"
									layout="fill"
									objectFit="cover"
									className="rounded-lg"
								/>
							) : selectedBackground ? (
								<>
									{/* Background Image */}
									<Image
										src={backgroundOptions.find((bg) => bg.id === selectedBackground)?.src ?? ''}
										alt="Selected background"
										layout="fill"
										objectFit="cover"
										className="rounded-lg"
									/>
									{/* Overlay Image with 5% Transparency */}
									<Image
										src="/black.jpg" // Replace with your overlay image path
										alt="Overlay image"
										layout="fill"
										objectFit="cover"
										style={{
											opacity: 0.25,
											position: 'absolute',
											top: 0,
											left: 0,
											zIndex: 1, // Keeps the overlay on top of the background
										}}
										className="rounded-lg"
									/>
								</>
							) : (
								<div className="w-full h-full flex items-center justify-center text-gray-400">
									Select a background or upload an image
								</div>
							)}
						</div>

						{/* Text and other elements always on top */}

						{selectedAspectRatio === 'Instagram Story' ? (

							<div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10 ">
								<div className="flex items-center">
									<div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full"></div>
									<span className="ml-2 text-sm font-semibold">Your Brand Here</span>
								</div>
								<span className="text-xs">Sponsored</span>
							</div>

						) : ('')}


						{/* Caption */}
						<div
							ref={captionRef}
							className={` absolute ${isEditing ? ' cursor-move' : 'cursor-default'}  font-semibold z-10`}
							style={{
								left: captionPosition.x,
								bottom: captionPosition.y,
								fontSize: `${captionSize}px`,
								color: captionColor,
								width: `${captionWidth}px`,
								resize: isEditing ? 'horizontal' : 'none',
								overflow: 'hidden',
							}}
						>
							<div className=''>


							{isEditing && (
								<>
									<div className="resize-handle left-handle absolute left-0 top-0 w-2 h-full cursor-ew-resize bg-blue-500 opacity-50" />
									<div className="resize-handle right-handle absolute right-0 top-0 w-2 h-full cursor-ew-resize bg-blue-500 opacity-50" />
								</>
							)}
							Because your couch isn’t a vacation destination!
								</div>
						</div>

						{/* Bottom Buttons */}

						{ selectedAspectRatio === 'Instagram Story' ? (
							<div className="absolute bottom-4 left-4 right-4 z-10 ">
								<div className="flex justify-between">
									<button className="bg-black text-white px-4 py-2 rounded-full text-sm">
										Get offer
									</button>
									<button className="bg-black p-2 rounded-full">
										<Upload className="w-4 h-4" />
									</button>
								</div>
							</div>
						) : ('')}

					</div>
				</div>


				{isEditing && (
					<div className="mt-4 flex flex-col gap-2">
						<input
							type="range"
							min="12"
							max="32"
							value={captionSize}
							onChange={(e) => setCaptionSize(Number(e.target.value))}
							className="w-full"
						/>
						<input
							type="color"
							value={captionColor}
							onChange={(e) => setCaptionColor(e.target.value)}
							className="w-full h-10"
						/>
					</div>
				)}
			</div>
		</div>
	);
}
