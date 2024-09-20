"use client"

import React from 'react'
import SidebarInterface from '@/components/common/sidebarinterface'
import { CardHoverEffect } from '@/components/cards'

const Page = () => {
	return (

		<div>
			<div className='flex min-w-screen min-h-screen justify-center bg-black items-center'>
				<div className='bg-black border-t-2 w-full h-full sm:w-[80%] sm:h-[80%] md:rounded-3xl grid shadow-2xl shadow-slate-800 lg:grid-cols-10'>
					{/* Left side navbar */}
					<div className='bg-black-400 h-full lg:col-span-2 hidden lg:block items-center border-r justify-center'>
						<SidebarInterface />
					</div>

					{/* Right side box */}
					<div className='col-span-8 flex justify-center h-full w-full'>

						<CardHoverEffect />

					</div>
				</div>
			</div>
		</div>
	)
}

export default Page
