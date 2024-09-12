"use client";
import React, { useState } from 'react';
import { IconHomeFilled, IconCircuitBattery, IconTimeline, IconGhost2Filled, IconSettingsFilled, IconBrandPatreonFilled, IconCaretDownFilled, IconBrandXFilled, IconBrandInstagram, IconBrandMeta, IconBrandLinkedin } from '@tabler/icons-react';
import { useForm } from 'react-hook-form';

const page = () => {

	const { register, handleSubmit, formState: { errors } } = useForm();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [selectedPlatform, setSelectedPlatform] = useState('');

	const onSubmit = (data: any) => {
		setIsSubmitting(true);
		console.log(data);

		setTimeout(() => {
			setIsSubmitting(false);
			alert('Form submitted successfully!');
		}, 2000);
	};
	return (
		<div className='w-screen h-screen bg-[#eceeed] flex justify-center items-center py-12'>
			<div className={`h-full w-[90%] bg-black flex border-2 border-black rounded-3xl ${isSubmitting ? 'blur-sm' : ''}`}>

				{/* navbar */}

				<div className='h-full w-1/6  flex items-center flex-col p-6 '>
					<div className='border w-full mb-7 flex justify-center items-center border-black p-3'>
						LOGO
					</div>

					<div className='flex flex-col gap-5'>
						<IconButton icon={<IconHomeFilled size={20} />} title="Home" />
						<IconButton icon={<IconCircuitBattery stroke={2} />} title="Brands" />
						<IconButton icon={<IconTimeline size={20} />} title="Projects" />
						<IconButton icon={<IconGhost2Filled size={20} />} title="Inspirations" />
						<IconButton icon={<IconSettingsFilled size={20} />} title="Settings" />
					</div>
				</div>
			</div>
		</div>
	)
}

interface IconProps {
	icon: any
	title: string
}

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

export default page
