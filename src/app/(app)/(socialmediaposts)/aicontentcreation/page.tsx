"use client";
import React, { useState } from 'react';
import { IconHomeFilled, IconCircuitBattery, IconTimeline, IconGhost2Filled, IconSettingsFilled, IconBrandPatreonFilled, IconCaretDownFilled, IconBrandXFilled, IconBrandInstagram, IconBrandMeta, IconBrandLinkedin } from '@tabler/icons-react';
import { useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios'
import { useToast } from '@/components/ui/use-toast';
import { apiResponse } from '@/types/ApiResponse';

const Page = () => {
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

								<form onSubmit={handleSubmit(onSubmit)} className={`grid grid-cols-2 gap-4 p-6 ${isSubmitting ? 'blur-sm' : ''}`}>

									{/* Platform Selection */}

									<div className='pl-7'>

										<p className='text-black font-medium text-lg pb-3'>Choose Platform :</p>

										<div className='flex gap-4 col-span-4 '>

											{['Twitter', 'Instagram', 'Meta', 'LinkedIn'].map((platform) => (
												<button
													key={platform}
													type="button"
													className={`p-6 rounded-lg h-14 w-[150px] ${selectedPlatform === platform ? 'bg-[#1c1c1c] text-white' : 'bg-white text-black'} flex  justify-center items-center font-semibold`}
													onClick={() => handlePlatformSelect(platform)}
												>
													{platform === 'Twitter' && <IconBrandXFilled size={20} />}
													{platform === 'Instagram' && <IconBrandInstagram />}
													{platform === 'Meta' && <IconBrandMeta size={25} stroke={2} />}
													{platform === 'LinkedIn' && <IconBrandLinkedin />}
													<span className='ml-2'>{platform}</span>
												</button>
											))}
										</div>

										<div className='mt-3'>
											<input required {...register('contentType', { required: true })} placeholder="Content Type" className="p-3 w-[590px] rounded-xl border" />
											{/* {errors.contentType && <span className="text-red-500">Content Type is required</span>} */}
										</div>

										<div className='mt-3 flex gap-3 w-[590px] justify-between'>
											<input required {...register('targetAudience', { required: true })} placeholder="Your Target Audience (example: influencers, millennials)" className="p-3 w-1/2 rounded-xl border" />

											<input required {...register('countryRegion', { required: true })} placeholder="Worldwide/Your-Country/Region" className="p-3 w-1/2 rounded-xl border" />
										</div>

										<div className='pt-3'>
											<textarea required {...register('objective', { required: true })} placeholder="Objective" className="p-2 h-28 rounded-xl w-[590px] border col-span-2" />
										</div>

										<div className='pt-3 '>
											<button type="submit" className="col-span-2 p-2 w-[100px] hover:bg-black hover:text-white font-semibold bg-white text-black rounded" disabled={isSubmitting}>
												{isSubmitting ? 'Submitting...' : 'I am done!'}
											</button>
										</div>

									</div>
								</form>
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

export default Page;
