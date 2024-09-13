"use client"
import SidebarInterface from '@/components/common/sidebarinterface'
import { Button } from '@/components/ui/button';
import { IconPlus, IconBell, IconAppWindowFilled } from '@tabler/icons-react';
import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import CustomButtom from '@/components/common/buttons';
import { Loader2 } from 'lucide-react';


const page = () => {

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isAddBrandClicked, setIsAddBrandClicked] = useState(false);

	const handleAddBrandCreation = () => {
		setIsAddBrandClicked(true);
		setIsSubmitting(true)
		setTimeout(() => {
			setIsSubmitting(false)
		}, 3000)
	}

	return (
		<div className='flex w-screen h-screen justify-center bg-black items-center'>

			<div className='bg-black border-t-2 w-full h-full sm:w-[80%] sm:h-[80%] md:rounded-3xl grid shadow-2xl shadow-slate-800 lg:grid-cols-10'>

				{/* left side navbar */}

				<div className=' bg-black-400 h-full lg:col-span-2 hidden lg:block items-center border-r justify-center'>

					<SidebarInterface />

				</div>

				{/* right side box */}

				{/* <div className='lg:col-span-8 w-full h-full border-pink-800 border-4'>

					<div className='font-semibold flex justify-between p-3 items-center px-8 py-10  '>
						<p className='text-white text-left text-lg'>Let's Put Your Brand on the Map (Literally)</p>
						<button className="glow hover:bg-white hover:text-black flex justify-center  ">
							Upgrade
						</button>
					</div>


					<div className='grid justify-center h-[80%] items-center border-b2 border-purple-800   '>

						<p className='text-white'>No brand has been added yet. Please add it to continute</p>

						<Button className='py-4'>
							<div className='p-3 py-2 flex justify-center items-center'>
								< IconPlus stroke={2} size={20} />
								<p>Add Brand</p>
							</div>
						</Button>

					</div>







				</div> */}

				<div className='lg:col-span-8  h-full'>

					{/* right side first top element */}

					<div className='font-semibold rounded-tl-3xl h-[15%] flex justify-between rounded-t items-center px-8'>

						<p className='text-neutral-200 text-left text-lg'>Let's Put Your Brand on the Map (Literally)</p>
						<Button className="glow hover:bg-black hover:text-white flex justify-center rounded-3xl">
							Upgrade
						</Button>
						<Button className='md:block hidden rounded-2xl'>
							< IconBell stroke={2} size={20} />
						</Button>

					</div>

					{/* right side other part element  */}

					{/* TODO : fix this issue where brand can be added  */}

					{isAddBrandClicked ?

						(

							<div className='h-[85%] flex border-red-700 flex-col gap-6 text-center items-center text-white justify-center bg-black'>

								<div className='flex gap-4 items-center justify-center'>

									<div className='flex gap-2 items-center justify-center'>

										<IconAppWindowFilled size={20} />

										<p className='text-neutral-200'>Impore from website</p>

									</div>

									<div>

										<Input className='w-[260px]' placeholder="www.example.com" />

									</div>

									<CustomButtom text='Import Brand' onClick={() => setIsAddBrandClicked(false)} />


								</div>




							</div>
						):
						(
					<div className='h-[85%] flex flex-col gap-6 text-center items-center justify-center bg-black'>

						<p className='text-neutral-200'>No brand has been created yet, click below to create a brand</p>


						<button className='py-4 ' onClick={handleAddBrandCreation}>
							<div className='p-3 py-2 flex justify-center text-white items-center bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-full  rounded-md h-10 border border-zinc-800 shadow-[0px_-1px_0px_0px_var(--zinc-800)_inset]"'>
										< IconPlus stroke={2} size={20} color='white' />
										{isSubmitting ? <Loader2 className="animate-spin" /> : (<p>Add Brand</p>)}
             <BottomGradient/>
							</div>
						</button>



					</div>
				)}



				</div>

			</div>



		</div>
	)
}

const BottomGradient = () => {
	return (
		<>
			<span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
			<span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
		</>
	);
};

export default page
