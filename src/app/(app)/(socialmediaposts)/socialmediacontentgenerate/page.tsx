"use client";
import { HoverBorderGradientDemo } from "@/components/landing-page-button";
import React, { useRef, useEffect, useState } from "react";


export default function YourComponent() {
	return (

		<div className='h-screen w-screen flex justify-center items-center bg-purple-200'>

			<div className='h-full w-[90%] bg-[#0c0c0c] flex flex-col justify-center items-center text-center rounded-3xl border mt-28'>

				<div className='p-8 flex flex-col gap-5 justify-center items-center text-center mt-28'>
					<p className='text-6xl font-bold text-white text-center '>
						Generate Social Posts
					</p>
					<p className='text-gray-300'>
						Generate engagement-centered social media post creatives in just seconds using <br />
						Artificial Intelligence. Effortlessly produce perfectly sized creatives for <br />
						Facebook, Instagram, LinkedIn, Pinterest, Twitter, and more!
				</p>

				</div>

				<HoverBorderGradientDemo />



			</div>


			</div>

	);
}
