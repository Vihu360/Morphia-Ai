import React from 'react'
import { IconHomeFilled, IconCircuitBattery, IconTimeline, IconGhost2Filled, IconSettingsFilled } from '@tabler/icons-react';

 const SidebarInterface = () => {
	return (
<div className='pt-12 flex flex-col justify-center items-center '>
			<div className=' w-full mb-7 text-white flex justify-center items-center border-black p-3'>
				LOGO
			</div>
			<div className='flex flex-col gap-5 '>
				<IconButton icon={<IconHomeFilled size={20} />} title="Home" />
				<IconButton icon={<IconCircuitBattery stroke={2} />} title="Brands" />
				<IconButton icon={<IconTimeline size={20} />} title="Projects" />
				<IconButton icon={<IconGhost2Filled size={20} />} title="Inspirations" />
				<IconButton icon={<IconSettingsFilled size={20} />} title="Settings" />
			</div>
</div>

	)
}

interface IconProps {
	icon: any;
	title: string;
}

// Reusable IconButton Component

const IconButton = ({ icon, title }: IconProps) => {
	return (
		<div>
			<button className='w-full flex gap-2 justify-start items-center hover:border-r rounded mb-2 '>
				<div className='bg-white p-2 rounded-xl'>
					{icon}
				</div>
				<p className='ml-2 font-semibold text-xl text-white'>{title}</p>
			</button>
		</div>
	);
};

const BottomGradient = () => {
	return (
		<>
			<span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
			<span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
		</>
	);
};

export default SidebarInterface;
