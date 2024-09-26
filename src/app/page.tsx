"use client"

import React from 'react';
import { NavbarDemo } from '@/components/navbar';
import { BackgroundLinesDemo } from '@/components/bacground-lines';

const Page = () => {
	return (
		<div className='min-w-screen min-h-screen bg-black flex items-center flex-col justify-center'>
			<NavbarDemo />
			<BackgroundLinesDemo/>
		</div>
	);
};

export default Page;
