"use client"

import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useToast } from "@/components/ui/use-toast";
import SidebarInterface from '@/components/common/sidebarinterface';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CustomButton from '@/components/common/buttons';
import { Separator } from "@/components/ui/separator";
import {
	IconPlus, IconBell, IconAppWindowFilled, IconAwardFilled,
	IconBrandPatreonFilled, IconGridGoldenratio, IconTrash
} from '@tabler/icons-react';
import { Loader2 } from 'lucide-react';
import { apiResponse } from '@/types/ApiResponse';

interface Brand {
	id: string;
	brandName: string;
}

const Page: React.FC = () => {

	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [isAddBrandClicked, setIsAddBrandClicked] = useState<boolean>(false);
	const [url, setUrl] = useState<string>('');
	const [inputBrandName, setInputBrandName] = useState<string>('');
	const [inputBrandDescription, setInputBrandDescription] = useState<string>('');
	const [inputIndustryType, setInputIndustryType] = useState<string>('');
	const [brands, setBrands] = useState<Brand[]>([]);
	const [isBrandsLoading, setIsBrandsLoading] = useState<boolean>(true);

	const { toast } = useToast();

	// Fetch all brands on component mount
	useEffect(() => {
		fetchAllBrands();
	}, []);

	// Function to fetch all brands
	const fetchAllBrands = async (): Promise<void> => {
		try {
			setIsBrandsLoading(true);
			const response = await axios.get<{ findAllCreatedBrandsdata: { brandName: string; _id: string }[] }>('/api/getAllBrandsUsers');
			const brandsData = response.data.findAllCreatedBrandsdata;

			if (brandsData && brandsData.length > 0) {
				const brandsArray: Brand[] = brandsData.map(brand => ({
					brandName: brand.brandName,
					id: brand._id
				}));
				setBrands(brandsArray);
			}
		} catch (error) {
			console.error('Error fetching brands:', error);
			toast({
				title: 'Error',
				description: 'Failed to fetch brands. Please try again.',
				variant: 'destructive'
			});
		} finally {
			setIsBrandsLoading(false);
		}
	};

	// Function to delete a brand
	const deleteBrand = async (id: string): Promise<void> => {
		try {
			await axios.delete('/api/deletebrand', { data: { id } });
			setBrands(prevBrands => prevBrands.filter(brand => brand.id !== id));
			toast({
				title: 'Success',
				description: 'Brand deleted successfully',
				duration: 4000,
			});
		} catch (error) {
			console.error('Error deleting brand:', error);
			toast({
				title: 'Error',
				description: 'Failed to delete brand. Please try again.',
				variant: 'destructive'
			});
		}
	};

	// Function to handle brand creation from website URL
	const handleImportWebsiteClick = async (): Promise<void> => {
		if (!url) {
			toast({
				title: 'Error',
				description: 'Please enter a URL',
				variant: 'destructive'
			});
			return;
		}

		setIsSubmitting(true);
		try {
			await axios.post<apiResponse>('/api/brandcreation', { brandLink: url });
			toast({
				title: 'Success',
				description: 'Brand created successfully',
			});
			fetchAllBrands(); // Refresh the brands list
			window.location.href = '/brandcreate/';

		} catch (error) {
			console.error('Error creating brand:', error);
			const axiosError = error as AxiosError<apiResponse>;
			toast({
				title: 'Failed',
				description: axiosError.response?.data.message ?? 'An error occurred while creating your Brand. Please try again.',
				variant: 'destructive'
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	// Function to handle manual brand creation
	const handleManuallyCreateBrand = async (): Promise<void> => {
		// Implement the logic for manual brand creation here
		console.log("Creating brand:", { inputBrandName, inputBrandDescription, inputIndustryType });
		// After implementation, don't forget to refresh the brands list
	};

	// Render function for brand list or add brand form
	const renderBrandContent = (): JSX.Element => {
		if (isBrandsLoading) {
			return <div className='flex w-full h-[85%] justify-center items-center'><Loader2 className="animate-spin bg-white w-4 p-2" /></div>;
		}

		if (brands.length > 0) {
			return (
				<div className='h-[85%] text-white flex flex-col text-center items-center justify-center bg-black'>
					<div>
						{brands.map((brand) => (
							<div key={brand.id} className="bg-gray-800 p-4 md:min-w-[500px] gap-4 md:gap-0 flex items-center justify-between rounded-lg shadow-md mb-4">
								<h3 className='text-lg font-semibold'>{brand.brandName}</h3>
								<IconTrash onClick={() => deleteBrand(brand.id)} stroke={2} size={20} color='white' className='cursor-pointer' />
							</div>
						))}
					</div>
					<CustomButton
						text='Add more Brand'
						onClick={() => setIsAddBrandClicked(true)}
					/>
				</div>
			);
		}

		return (
			<div className='h-[85%] flex flex-col gap-6 text-center items-center justify-center bg-black'>
				<p className='text-neutral-200'>No brand has been created yet, click below to create a brand</p>
				<button className='py-4' onClick={() => setIsAddBrandClicked(true)}>
					<div className='p-3 py-2 flex justify-center text-white items-center bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 bg-zinc-800 w-full rounded-md h-10 border border-zinc-800 shadow-[0px_-1px_0px_0px_var(--zinc-800)_inset]'>
						<IconPlus stroke={2} size={20} color='white' />
						<p>Add Brand</p>
						<BottomGradient />
					</div>
				</button>
			</div>
		);
	};

	// Render function for add brand form
	const renderAddBrandForm = (): JSX.Element => (
		<div className='h-[85%] flex border-white flex-col gap-2 text-center items-center text-white justify-center bg-black'>
			{/* Import from website section */}
			<div className='md:flex gap-4 items-center justify-center'>
				<div className='flex gap-2 items-center justify-center'>
					<IconAppWindowFilled size={20} />
					<p className='text-neutral-200 text-lg'>Import from website</p>
				</div>
				<div>
					<Input
						className='w-[260px]'
						placeholder="www.example.com"
						value={url}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
					/>
				</div>
				<CustomButton text='Import Brand' isLoading={isSubmitting} onClick={handleImportWebsiteClick} />
			</div>

			<div className='flex items-center mb-2 pb-2 gap-2 justify-center'>
				<Separator className="bg-neutral-400 w-[100px]" />
				<p className='text-neutral-200'>or</p>
				<Separator className="bg-neutral-400 w-[100px]" />
			</div>

			{/* Manual brand creation form */}
			<div className='md:flex gap-4 items-center justify-start md:w-[620px] w-[260px]'>
				<div className='flex gap-2 items-center justify-center'>
					<IconAwardFilled size={20} />
					<p className='text-neutral-200 text-lg mr-11'>Name of the Brand</p>
				</div>
				<div>
					<Input
						className='md:w-[360px]'
						placeholder="Amazon"
						value={inputBrandName}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputBrandName(e.target.value)}
					/>
				</div>
			</div>

			<div className='md:flex gap-4 items-center justify-start md:w-[620px] w-[260px]'>
				<div className='flex gap-2 items-center justify-center'>
					<IconBrandPatreonFilled size={20} />
					<p className='text-neutral-200 text-lg'>Description of the Brand</p>
				</div>
				<div>
					<Input
						className='md:w-[360px] h-[80px]'
						placeholder="Here goes your description of the brand"
						value={inputBrandDescription}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputBrandDescription(e.target.value)}
					/>
				</div>
			</div>

			<div className='md:flex gap-4 items-center justify-start md:w-[620px] w-[260px]'>
				<div className='flex gap-2 md:mr-[90px] items-center justify-center'>
					<IconGridGoldenratio stroke={2} size={20} />
					<p className='text-neutral-200 text-lg'>Industry type</p>
				</div>
				<div>
					<Input
						className='md:w-[360px]'
						placeholder="Groceries / Clothing / Meme Marketing"
						value={inputIndustryType}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputIndustryType(e.target.value)}
					/>
				</div>
			</div>

			<CustomButton text='Create Brand' onClick={handleManuallyCreateBrand} />
		</div>
	);

	return (
		<div className='flex w-screen h-screen justify-center bg-black items-center'>
			<div className='bg-black border-t-2 w-full h-full sm:w-[80%] sm:h-[80%] md:rounded-3xl grid shadow-2xl shadow-slate-800 lg:grid-cols-10'>
				{/* Left side navbar */}
				<div className='bg-black-400 h-full lg:col-span-2 hidden lg:block items-center border-r justify-center'>
					<SidebarInterface />
				</div>

				{/* Right side box */}
				<div className='lg:col-span-8 h-full'>
					{/* Right side first top element */}
					<div className='font-semibold rounded-tl-3xl h-[15%] flex justify-between rounded-t items-center px-8'>
						<p className='text-neutral-200 text-left text-lg'>Your Brands</p>
						<Button className="glow hover:bg-black hover:text-white flex justify-center rounded-3xl">
							Upgrade
						</Button>
						<Button className='md:block hidden rounded-2xl'>
							<IconBell stroke={2} size={20} />
						</Button>
					</div>

					{/* Right side other part element */}
					{isAddBrandClicked ? renderAddBrandForm() : renderBrandContent()}
				</div>
			</div>
		</div>
	);
};

const BottomGradient: React.FC = () => (
	<>
		<span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
		<span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
	</>
);

export default Page;
