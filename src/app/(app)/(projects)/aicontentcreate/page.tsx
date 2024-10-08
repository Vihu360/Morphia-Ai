"use client"

import React, { useState, useEffect } from 'react';
import SidebarInterface from '@/components/common/sidebarinterface';
import { IconBrandPatreonFilled, IconBrandXFilled, IconBrandMeta, IconBrandInstagram, IconBrandLinkedin } from '@tabler/icons-react';
import { Input } from '@/components/ui/input';
import { useToast } from "@/components/ui/use-toast";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import CustomButtom from '@/components/common/buttons';

const Page: React.FC = () => {
	const [selectBrand, setSelectBrand] = useState<{ brandName: string; id: string; description: string }>({ brandName: '', id: '', description: '' });
	const [selectSocialMediaPlatform, setSelectSocialMediaPlatform] = useState('');
	const [selectedCard, setSelectedCard] = useState<string | null>(null);
	const [brands, setBrands] = useState<{ brandName: string; id: string; description: string }[]>([]);
	const [contentType, setContentType] = useState('');
	const [objective, setObjective] = useState('');
	const [anyotherDescription, setAnyotherDescription] = useState('');
	const [aiResponsePosts, setAiResponsePosts] = useState<boolean>(false);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [aiResponseData, setaiResponseData] = useState([]);

	const { toast } = useToast();
	const router = useRouter();

	// ... (keep all the existing functions like handleSelectSocialMediaPlatform, fetchAllBrands, etc.)

	const handleSelectSocialMediaPlatform = (platform: string) => {
		setSelectSocialMediaPlatform(platform);
		setSelectedCard(platform); // Set the selected card
	};

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

	const handleGenerateAiHooks = async () => {

		setIsSubmitting(true);

		try {

			if (!selectSocialMediaPlatform) {
				return toast({
					title: 'Where you want to post?',
					description: 'Please select a social media platform and try again',
					variant: 'destructive'
				});
			}

			if (contentType === "") {
				return toast({
					title: 'content Type is required',
					description: 'Please select a content type and try again',
					variant: 'destructive'
				});
			}

			if (objective === "") {
				return toast({
					title: 'Objective is required',
					description: 'Please select a Objective and try again',
					variant: 'destructive'
				});
			}

			if (brands.length === 0) {
				return toast({
					title: 'No brands found',
					description: 'Please add a brand first and try again',
					variant: 'destructive'
				})
			}

			const response = await axios.post('/api/aigeneratesocialmediaposts', {
				brandData: selectBrand,
				platform: selectSocialMediaPlatform,
				contentType: contentType,
				objective: objective,
				anyotherDescription: anyotherDescription
			});

			// // Handle the response if needed
			const aiResponse = response.data.content

			setaiResponseData(aiResponse);

			if (aiResponse) {
				setAiResponsePosts(true);
			}


		} catch (error) {
			// Handle errors appropriately
			console.error('Error generating AI hooks:', error);
		}
		finally {
			setIsSubmitting(false);
		}
	};

	const handleCopyText = (post: string) => {
		navigator.clipboard.writeText(post);
		toast({
			title: 'Success',
			description: 'Text copied to clipboard',
		})
	};

	const displayOnlyTwotexts = (brandName: string) => {
		const words = brandName.split(' ');

		if (words.length > 2) {
			return words.slice(0, 2).join(' ') + '...';
		}
		return brandName;
	}



	return (
		<div className='flex min-w-screen min-h-screen justify-center bg-black md:items-center'>
			<div className='bg-black md:border-t-2 w-full h-[100%] border-blue-800 border sm:w-[80%] sm:h-[80%] md:rounded-3xl grid md:shadow-2xl md:shadow-slate-800 lg:grid-cols-10'>
				{/* Left side navbar */}
				<div className='bg-black-400 h-full lg:col-span-2 hidden lg:block items-center border-r justify-center'>
					<SidebarInterface />
				</div>

				{/* Right side box */}
				<div className='lg:col-span-8 h-[100%]'>
					{aiResponseData.length > 0 ? (
						<div className='text-white w-full h-[100%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 sm:p-8 md:p-14'>
							{aiResponseData.map((post: any, index: number) => (
								<div
									key={index}
									className='relative flex justify-center items-center text-white shadow-2xl shadow-slate-800 bg-[#0d0d0d] rounded-xl min-h-[150px] p-4 hover:bg-[#1f1f1f] group'
								>
									{post}
									<div
										className='absolute inset-0 sm:flex justify-center items-center bg-gray-800 rounded-xl bg-opacity-70 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer hidden'
										onClick={() => handleCopyText(post)}
									>
										Copy
									</div>
								</div>
							))}
						</div>
					) : (
						<div className='text-white w-full h-[100%] flex flex-col items-center justify-start'>
							{/* Header - visible on all screen sizes */}
							<div className='flex justify-between md:h-[12%] gap-6 w-full px-4 md:px-10 items-center py-4 md:py-0'>
								<div className='flex gap-3 items-center justify-center'>
									<IconBrandPatreonFilled size={30} color='white' className='hidden sm:block' />
									<p className='text-white font-semibold text-left text-lg'>Generate perfect hooks</p>
								</div>
								<button className='rounded-2xl bg-neutral-200 p-[8px] flex justify-center gap-1 items-center'>
									<select
										className="text-black bg-neutral-200 cursor-pointer decoration-none"
										onChange={(e) => setSelectBrand(JSON.parse(e.target.value))}
									>
										{brands.map((brand) => (
											<option key={brand.id} value={JSON.stringify(brand)}>
												{displayOnlyTwotexts(brand.brandName)}
											</option>
										))}
									</select>
								</button>
							</div>

							{/* Content - different layouts for mobile and larger screens */}
							<div className='flex justify-center items-center w-full h-full md:h-[88%]'>
								<div className='w-full md:w-2/3 lg:w-1/2 grid items-center justify-center py-3 px-4 md:px-0'>
									<div className='grid gap-3 py-2 pt-2 sm:pt-2'>
										<div>
											<p className='text-lg'>Choose the platform:</p>
										</div>
										<div className='grid grid-cols-2 md:flex items-center gap-2 justify-between cursor-pointer'>
											<Cards text="Twitter" icon={IconBrandXFilled} isSelected={selectedCard === "Twitter"} onSelect={handleSelectSocialMediaPlatform} />
											<Cards text="Meta" icon={IconBrandMeta} isSelected={selectedCard === "Meta"} onSelect={handleSelectSocialMediaPlatform} />
											<Cards text="Instagram" icon={IconBrandInstagram} isSelected={selectedCard === "Instagram"} onSelect={handleSelectSocialMediaPlatform} />
											<Cards text="LinkedIn" icon={IconBrandLinkedin} isSelected={selectedCard === "LinkedIn"} onSelect={handleSelectSocialMediaPlatform} />
										</div>
									</div>
									<div className='grid gap-3 md:gap-1 py-2 md:pb-2'>
										<p className=''>Content Type:</p>
										<Input onChange={(e) => setContentType(e.target.value)} placeholder="Humorous/Realistic/Creative" className="w-full border text-xs" />
									</div>
									<div className='grid gap-3 md:gap-1 py-2 md:pb-1'>
										<p className=''>Enter the objective:</p>
										<Input onChange={(e) => setObjective(e.target.value)} placeholder="Generating Engagements/Reactions/More Reach" className="w-full border text-xs" />
									</div>
									<div className='grid gap-3 md:gap-1 py-2'>
										<p className=''>Any other details you want to provide us:</p>
										<Input onChange={(e) => setAnyotherDescription(e.target.value)} placeholder="Use a mix of famous quotes, wordplay, and creative comparisons" className="w-full border text-xs" />
									</div>
									<div className='w-full mt-4 md:mb-4 flex items-center justify-center'>
										<CustomButtom className='w-full' text="Generate AI Hooks" isLoading={isSubmitting} onClick={handleGenerateAiHooks} />
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

const Cards: React.FC<{ text: string, icon: any, isSelected: boolean, onSelect: (text: string) => void }> = ({ text, icon: Icon, isSelected, onSelect }) => {
	return (
		<button
			onClick={() => onSelect(text)}
			className={`w-full md:w-[115px] rounded h-12 flex items-center justify-center gap-2 hover:border-b-2 ${isSelected ? 'bg-black border-t-2 text-white' : 'bg-[#27272A] text-white'
				}`}
		>
			<Icon size={30} color='white' />
			<p>{text}</p>
		</button>
	);
};

export default Page;
