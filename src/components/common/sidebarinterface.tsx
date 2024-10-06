import React from 'react'
import { IconHomeFilled, IconCircuitBattery, IconTimeline, IconGhost2Filled, IconSettingsFilled } from '@tabler/icons-react';
import Link from 'next/link';
import Image from 'next/image';

 const SidebarInterface = () => {
	return (
<div className='flex h-full flex-col gap-6 justify-center items-center'>
			<div className=' w-full text-white flex justify-center items-center '>
				<Image
				src="/favicon.ico" alt="logo" width={100} height={100}/>
			</div>
			<div className='flex flex-col gap-5 '>
				<IconButton icon={<IconHomeFilled size={20} />} title="Home" link="/" />
				<IconButton icon={<IconCircuitBattery stroke={2} />} title="Brands" link="brandcreate" />
				<IconButton icon={<IconTimeline size={20} />} title="Projects" link="projects"  />
				<IconButton icon={<IconGhost2Filled size={20} />} title="Creativity" link="creativity" />
				<IconButton icon={<IconSettingsFilled size={20} />} title="Settings" link="settings" />
			</div>
</div>

	)
}

interface IconProps {
	icon: any;
	title: string;
	link: string
}

// Reusable IconButton Component

const IconButton = ({ icon, title, link }: IconProps) => {
	return (
		<div>
			<Link href={`/${link}`}>
			<button className='w-full flex gap-2 justify-start items-center hover:border-r rounded mb-2 '>
				<div className='bg-white p-2 rounded-xl'>
					{icon}
				</div>
				<p className='ml-2 font-semibold text-xl text-white'>{title}</p>
			</button>
			</Link>
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
