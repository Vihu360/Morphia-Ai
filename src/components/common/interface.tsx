"use client";
import React, { useState } from 'react';
import { IconHomeFilled, IconCircuitBattery, IconTimeline, IconGhost2Filled, IconSettingsFilled, IconBrandPatreonFilled, IconCaretDownFilled, IconBrandXFilled, IconBrandInstagram, IconBrandMeta, IconBrandLinkedin } from '@tabler/icons-react';
import { useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios'
import { useToast } from '@/components/ui/use-toast';
import { apiResponse } from '@/types/ApiResponse';


const Interface = () => {
	const { register, handleSubmit } = useForm();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [selectedPlatform, setSelectedPlatform] = useState('');
	const [selectBrand, setSelectedBrand] = useState('Accernity Ui');

	const { toast } = useToast();

	const onSubmit = async (data: any) => {
		setIsSubmitting(true);

		try {

			console.log(data)

			console.log(selectedPlatform);

			const response = await axios.post('api/campaignsocialmediapost', { ...data, brandName: selectBrand }, data);

			console.log("response", response);

			toast({
				title: "Success",
				description: response.data.message,
			})


		} catch (error) {

			console.log("Error during generating response from ai for sm content:", error);

			const axiosError = error as AxiosError<apiResponse>;

			let errorMessage = axiosError.response?.data.message ?? ('There was a problem with contnt generation. Please try again.');

			toast({
				title: 'Generative response failed',
				description: errorMessage,
				variant: 'destructive',
			})

			setIsSubmitting(false);


		}
	}


	// Handle brand selection
	const handleBrandSelect = (brand: string) => {
		setSelectedBrand(brand);
	};


	// Handle platform selection
	const handlePlatformSelect = (platform: string) => {
		setSelectedPlatform(platform);
	};

	return (
		<div className='w-screen h-screen bg-[#eceeed] flex justify-center items-center py-12'>
			<div className={`h-full w-[90%] bg-black flex border-2 border-black rounded-3xl ${isSubmitting ? 'blur-sm' : ''}`}>

				{/* Sidebar */}

				<div className='h-full w-1/6 flex items-center flex-col p-6'>
					<div className='border w-full mb-7 flex justify-center items-center border-black p-3'>
						LOGO
					</div>
					<div className='lg:flex lg:flex-col lg:gap-5 hidden'>
						<IconButton icon={<IconHomeFilled size={20} />} title="Home" />
						<IconButton icon={<IconCircuitBattery stroke={2} />} title="Brands" />
						<IconButton icon={<IconTimeline size={20} />} title="Projects" />
						<IconButton icon={<IconGhost2Filled size={20} />} title="Inspirations" />
						<IconButton icon={<IconSettingsFilled size={20} />} title="Settings" />
					</div>
				</div>

				{/* Main Content */}
				<div className='h-full w-5/6'>
					<div className='w-full h-[15%]'></div>
					<div className='w-full h-[85%] rounded-tl-3xl rounded-br-3xl bg-[#1c1c1c]'>
						<div className='w-full h-[15%] flex items-center justify-between px-8'>
							<div className='flex items-center text-white gap-3'>
								<IconBrandPatreonFilled stroke={2} size={30} color='white' />
								<p className='text-lg font-medium'>Generate Ai Hooks for your Social Media Game</p>
							</div>
							<div>
								<button className='rounded-2xl bg-white p-2 flex justify-center gap-1 items-center'>
									<p className='font-medium text-base'>{selectBrand}</p>
									<IconCaretDownFilled size={15} />
								</button>
							</div>
						</div>

						{/* Form Section */}

						<div className='w-full h-[85%] bg-[#eceeed] rounded-br-3xl flex'>

							<div className='h-full w-[60%] border flex justify-center items-center'>

								
							</div>
							<div className='w-[40%] h-full border-2 border-yellow-800'>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

interface IconProps {
	icon: any;
	title: string;
}

// Reusable IconButton Component
const IconButton = ({ icon, title }: IconProps) => {
	return (
		<div>
			<button className='w-full flex gap-2 justify-start items-center rounded mb-2'>
				<div className='bg-white p-2 rounded-xl'>
					{icon}
				</div>
				<p className='ml-2 font-semibold text-xl text-white'>{title}</p>
			</button>
		</div>
	);
};

export default Interface;
