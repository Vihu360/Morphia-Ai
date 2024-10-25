"use client"

import React, { useState, useRef, useEffect, use } from 'react';
import Image from 'next/image';
import { Upload, Edit } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import axios from 'axios';
import { Input } from '@/components/ui/input';
import html2canvas from 'html2canvas';
import takeScreenshot from '@/helpers/takescreenshot';


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

const selectPlatform = {
	'Instagram Story': 'Instagram',
	'Instagram Post': 'Instagram',
	'Facebook Post': 'Facebook',
	'Facebook Story': 'Facebook',
	'Linkldn': 'LinkedIn',
	'Twitter': 'Twitter',
}

const selectAdGoal = {
	"Brand Awareness": "Brand Awareness",
	"Lead Generation": "Lead Generation",
	"Sales Conversion": "Sales Conversion",
	"Customer Retention": "Customer Retention",
	"Website Traffic": "Website Traffic",
	"Engagement": "Enagagemnt",
	"Market Penetration": "Market Penetration",
	"Product Launch": "Product launch",
}

const selectContentType = {
	"Humorous": "Humorous",
	"Witty": "Witty",
	"Professional": "Professional",
	"Luxury": "Luxury",
	"Relaxed": "Relaxed",
	"Friendly": "Friendly"
}

const selectLanguage = {
	"English": "English",
	"German": "German",
	"French": "French",
	"Spanish": "Spanish",
	"Italian": "Italian",
	"Hinglish": "Hinglish",
	"Russian": "Russian",
	"Hindi": "Hindi"
}

export default function AdCreator(): JSX.Element {

	const [selectedBackground, setSelectedBackground] = useState<string | null>(null);
	const [uploadedImage, setUploadedImage] = useState<string | null>(null);
	const [selectedAspectRatio, setSelectedAspectRatio] = useState<string>('Instagram Story');
	const [isEditing, setIsEditing] = useState(false);
	const [isCaptionGenerated, setIsCaptionGenerated] = useState(false);
	const [selectedCaption, setSelectedCaption] = useState("");
	const [aiGeneratedAdCaption, setAiGeneratedAdCaption] = useState<string[]>([]);
	const [selectAiGeneratedAdCaption, setaiGeneratedAdCaption] = useState<string>('Your Text Here');
	const [captionPosition, setCaptionPosition] = useState({ x: 20, y: 240 });
	const [captionSize, setCaptionSize] = useState(16);
	const [captionColor, setCaptionColor] = useState('#FFFFFF');
	const [captionWidth, setCaptionWidth] = useState(200);
	const [handleCustomizeWithAIClick, setHandleCustomizeWithAIClick] = useState(false);
	const [platform, setPlatform] = useState<string>('Instagram Story');
	const [brands, setBrands] = useState<{ brandName: string; id: string; description: string }[]>([]);
	const [selectBrand, setSelectBrand] = useState<{ brandName: string; id: string; description: string }>({ brandName: '', id: '', description: '' });
	const [adGoal, setAdGoal] = useState("Brand Awareness");
	const [contentType, setContentType] = useState("Humorous");
	const [language, setLanguage] = useState("English");
	const [keywords, setKeywords] = useState(" ");
	const [targetAudience, setTargetAudience] = useState(" ");
	const { toast } = useToast();

	// refs

	const carouselRef = useRef<HTMLDivElement>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const captionRef = useRef<HTMLDivElement>(null);
	const resizeStartXRef = useRef(0);
	const initialWidthRef = useRef(0);
	const previewRef = useRef<HTMLDivElement>(null);


	// downloading feature of images

	const captureScreenshot = () => {
		takeScreenshot("screen-for-ads");
	}




	//

	const fetchAllBrands = async () => {
		try {

			const response = await axios.get<{ findAllCreatedBrandsdata: { brandName: string; _id: string; brandDescription: string }[] }>('/api/getAllBrandsUsers');
			const brandsData = response.data.findAllCreatedBrandsdata;

			if (brandsData && brandsData.length > 0) {
				const brandsArray = brandsData.map(brand => ({
					brandName: brand.brandName,
					id: brand._id,
					description: brand.brandDescription
				}));
				setBrands(brandsArray);
				setSelectBrand(brandsArray[0]);
			}
			if (!brandsData) {
				return toast({
					title: 'Error',
					description: 'Please add a brand first and try again',
					variant: 'destructive'
				})
			}
		} catch (error) {
			console.error('Error fetching brands:', error);
			toast({
				title: 'Error',
				description: 'Failed to fetch brands. Please try again.',
				variant: 'destructive'
			});
		}
	};


	useEffect(() => {
		fetchAllBrands();
	}, []);


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

	const handleCaptionClick = (caption: string) => {
		setSelectedCaption(caption);
		setaiGeneratedAdCaption(caption);
	};


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
	const handleCustomizeWithAI = async () => {
		// Check if both selectedBackground and uploadedImage are null
		if (selectedBackground === null && uploadedImage === null) {
			toast({
				title: "Error!",
				description: "Please select a background or upload an image first.",
				variant: "destructive"
			});
		} else {
			setHandleCustomizeWithAIClick(true);
			setIsEditing(false);
		}
	};


	const handleGenerateCaption = async () => {

		try {

			const response = await axios.post('/api/aigeneratedadscaption', { brandData:selectBrand , adGoal, platform, contentType, language, keywords, targetAudience })

			const adCaptions = response.data

			setAiGeneratedAdCaption(adCaptions.content);
			setIsCaptionGenerated(true);

		} catch (error) {

			console.log("error", error)

		}

	};

	const handleAspectRatioChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedAspectRatio(event.target.value);
	};

	const toggleEditing = () => {
		setIsEditing(!isEditing);
	};

	const leftSideSelectBgUi = (): JSX.Element => (

		<div className="w-full h-full md:w-1/2 overflow-y-auto scrollbar-hide ">

			<h2 className="text-lg font-semibold mb-2">Background ideas</h2>
			<p className="text-sm mb-4 text-neutral-200">
				Produce similar backgrounds with your own words or our suggestions.
			</p>

			<div className='w-full h-[80%] overflow-y-auto scrollbar-hide '>
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

	);

	const leftSideAdCaptionUi = (): JSX.Element => (

		<div className="w-full h-full md:w-1/2 overflow-y-auto scrollbar-hide bg-black md:shadow-2xl md:shadow-slate-800 border-neutral-200 border">

			<div className='sm:flex flex-col items-center justify-center p-4 '>

				<h2 className="text-lg font-semibold mb-2">Perfect texts for your <span className='bg-white text-black p-[1.5px] rounded px-2'>ADS</span></h2>
			<p className="text-sm mb-4 text-neutral-200">
				Generate high engaging ads texts to use in your campaigns.
			</p>
			</div>

			{isCaptionGenerated ?
				(
					<div className='w-full h-[89%] bg-gray-800'>

						<h2 className="text-center text-xl font-semibold text-gray-800 mb-6">Select a Caption:</h2>

						<div className="flex flex-col space-y-4 px-12">
							{aiGeneratedAdCaption?.map((caption, index) => (
								<button
									key={index}
									className={`cursor-pointer p-4 rounded-lg transition
            ${selectedCaption === caption ? 'bg-white text-black border-none' : 'bg-black  text-white hover:bg-gray-700 '}`}
									onClick={() => handleCaptionClick(caption)}
								>
									{caption}
								</button>
							))}
							<button className="w-full mt-4 bg-purple-600 text-white py-2 rounded-lg flex items-center justify-center">Generate more</button>
							<button  onClick={captureScreenshot} className="w-full mt-4 bg-purple-600 text-white py-2 rounded-lg flex items-center justify-center">Download the final picture</button>
						</div>
					</div>
				):
				(
			<div className=" w-full h-[89%] sm:h-[84%] border-dotted border-t-4 border-black p-5 flex flex-col gap-3 sm:justify-center sm:items-center sm:px-12">

				<div className='w-full flex items-center justify-center border '>
					<div className='w-full flex flex-col items-start justify-center gap-1'>

						<label className='' htmlFor='platform-select' >where you want to run your ad ?</label>
						<select id="platform-select" onChange={(e) => setPlatform((e.target.value))}
							className="w-4/5 p-2 rounded bg-gray-700 text-white mr-2 cursor-pointer">

							{Object.keys(selectPlatform).map((platform) => (
								<option key={platform} value={platform} >
									{platform}
								</option>
							))}
						</select>

					</div>

					<div className='w-full flex flex-col items-start justify-center gap-1'>

						<label className='' htmlFor="product-select">select your product/brand</label>
						<select id="product-select" onChange={(e) => setSelectBrand(JSON.parse(e.target.value))}
							className="w-4/5 p-2 rounded bg-gray-700 text-white mr-2 cursor-pointer"
						>
							{brands.map((brand) => (
								<option key={brand.id} value={JSON.stringify(brand)}>
									{brand.brandName}
								</option>
							))}
						</select>

					</div>
				</div>

				<div className='w-full flex items-center justify-center '>
					<div className='w-full flex flex-col items-start justify-center gap-1'>

						<label className='' htmlFor='platform-select' >Your ad goal ?</label>
						<select id="platform-select" onChange={(e) => setAdGoal((e.target.value))}
							className="w-4/5 p-2 rounded bg-gray-700 text-white mr-2 cursor-pointer">

							{Object.keys(selectAdGoal).map((adgoal) => (
								<option key={adgoal} value={adgoal} >
									{adgoal}
								</option>
							))}
						</select>

					</div>

					<div className='w-full flex flex-col items-start justify-center gap-1'>

						<label className='' htmlFor="product-select">Tone of voice</label>
						<select id="product-select" onChange={(e) => setContentType((e.target.value))}
							className="w-4/5 p-2 rounded bg-gray-700 text-white mr-2 cursor-pointer"
						>
							{Object.keys(selectContentType).map((contentType) => (
								<option key={contentType} value={contentType}>
									{contentType}
								</option>
							))}
						</select>

					</div>
				</div>

				<div className='w-full flex flex-col gap-1'>

					<label className='pl-1' htmlFor="input-select">Your target audience (optional)</label>
					<Input onChange={(e) => setTargetAudience(e.target.value)} className='' id="input-select" placeholder='Frequent online shoppers / Health-conscious consumers / Working professionals' />

				</div>

				<div className='w-full flex justify-between gap-8 '>


					<div className='w-1/2  flex flex-col gap-1'>
						<label className='pl-1' htmlFor="input-select">keywords (optional)</label>
						<Input onChange={(e) => setKeywords(e.target.value)} className='' id="input-select" placeholder='Eye Pleasing / Delicious / Fresh / Smooth' />
					</div>

					<div className='w-1/2 flex flex-col items-start justify-center gap-1'>

						<label className='' htmlFor="product-select">language</label>
						<select id="product-select" onChange={(e) => setLanguage((e.target.value))}
							className="w-4/5 p-2 rounded bg-gray-700 text-white mr-2 cursor-pointer"
						>
							{Object.keys(selectLanguage).map((lang) => (
								<option key={lang} value={lang}>
									{lang}
								</option>
							))}
						</select>

					</div>


				</div>

				<button onClick={() => handleGenerateCaption()} className='w-full bg-purple-600 flex justify-center items-center p-2 mt-2 rounded'>
					<p>Generate texts with Ai</p>
				</button>

			</div>
				)}


		</div>



	)

	return (
		<div className="h-screen w-screen flex flex-col md:flex-row gap-4 p-4 bg-black text-neutral-200">
			{/* Left side */}

			{handleCustomizeWithAIClick ? leftSideAdCaptionUi() : leftSideSelectBgUi()}

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
						id="screen-for-ads"
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
									fill
									className="rounded-lg"
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									style={{ objectFit: 'cover' }}
								/>
							) : selectedBackground ? (
								<div>
									{/* Background Image */}
									<Image
										src={backgroundOptions.find((bg) => bg.id === selectedBackground)?.src ?? ''}
										alt="Selected background"
										fill
										className="rounded-lg"
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
										style={{ objectFit: 'cover' }}
									/>
									{/* Overlay Image with 25% Transparency */}
									<Image
										src="/black.jpg"
										alt="Overlay image"
										fill
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
										style={{
											objectFit: 'cover',
											opacity: 0.35,
											position: 'absolute',
											top: 0,
											left: 0,
											zIndex: 1,
										}}
										className="rounded-lg"
									/>
								</div>
							) : (
								<div className="w-full h-full flex items-center justify-center text-gray-400">
									Select a background or upload an image
								</div>
							)}
						</div>

						{/* Text and other elements */}
						{selectedAspectRatio === 'Instagram Story' && (
							<div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
								<div className="flex items-center">
									<div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full"></div>
									<span className="ml-2 text-sm font-semibold">Your Brand Here</span>
								</div>
								<span className="text-xs">Sponsored</span>
							</div>
						)}

						{/* Caption */}
						<div
							ref={captionRef}
							className={`absolute ${isEditing ? 'cursor-move' : 'cursor-default'} font-semibold z-10`}
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
							<div>
								{isEditing && (
									<>
										<div className="resize-handle left-handle absolute left-0 top-0 w-2 h-full cursor-ew-resize bg-blue-500 opacity-50" />
										<div className="resize-handle right-handle absolute right-0 top-0 w-2 h-full cursor-ew-resize bg-blue-500 opacity-50" />
									</>
								)}
								{selectedBackground !== null && selectAiGeneratedAdCaption}
							</div>
						</div>

						{/* Bottom Buttons */}
						{selectedAspectRatio === 'Instagram Story' && (
							<div className="absolute bottom-4 left-4 right-4 z-10">
								<div className="flex justify-between">
									<div className="bg-black text-white px-4 py-2 rounded-full text-sm">Get offer</div>
									<div className="bg-black p-2 rounded-full">
										<Upload className="w-4 h-4" />
									</div>
								</div>
							</div>
						)}
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
