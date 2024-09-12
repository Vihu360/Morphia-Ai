"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import * as three from 'three';
import { NavbarDemo } from '@/components/navbar';
const { shuffle } = require('txt-shuffle');

// Component to display images on different segments of a single cylinder
const PictureInCyl: React.FC = () => {
	const tex1 = useTexture('/image1.png');
	const tex2 = useTexture('/image2.png');
	const tex3 = useTexture('/image3.png');
	const tex4 = useTexture('/image4.png');
	const tex5 = useTexture('/image5.png');

	const meshRefs = [
		useRef<three.Mesh>(null),
		useRef<three.Mesh>(null),
		useRef<three.Mesh>(null),
		useRef<three.Mesh>(null),
		useRef<three.Mesh>(null),
	];

	useFrame(() => {
		meshRefs.forEach((ref) => {
			if (ref.current) {
				ref.current.rotation.y += 0.01; // Adjust rotation speed here
			}
		});
	});

	const rotations: [number, number, number][] = [
		[0.1, 0, 0.05], // Slight tilt for segment 1
		[0.1, (2 * Math.PI) / 5, -0.05], // Slight tilt for segment 2
		[0.1, (4 * Math.PI) / 5, 0.05], // Slight tilt for segment 3
		[0.1, (6 * Math.PI) / 5, -0.05], // Slight tilt for segment 4
		[0.1, (8 * Math.PI) / 5, 0.05], // Slight tilt for segment 5
	];

	const thetaLength = (2 * Math.PI) / 6 - 0.1;

	return (
		<>
			{meshRefs.map((ref, index) => (
				<mesh
					key={index}
					ref={ref}
					position={[0, 0.3, 0]}
					rotation={rotations[index]}
				>
					<cylinderGeometry args={[1, 1, 1, 30, 30, true, 0, thetaLength]} />
					<meshBasicMaterial
						map={[tex1, tex2, tex3, tex4, tex5][index]}
						side={three.DoubleSide}
					/>
				</mesh>
			))}
		</>
	);
};

const Banner: React.FC = () => {
	const [text, setText] = useState(''); // State to hold the shuffled text
	const [isInView, setIsInView] = useState(false); // State to track if the element is in view
	const textRef = useRef<HTMLDivElement>(null); // Ref for the text container

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					setIsInView(true);
					// Start shuffle animation when in view
					shuffle({
						text: 'Because Every AD matters',
						duration: 2, // Duration of shuffle animation
						fps: 60, // Frame rate of animation
						onUpdate: (output: string
						) => {
							setText(output); // Update state with the shuffled text
						}
					});
					observer.disconnect(); // Stop observing after animation starts
				}
			},
			{ threshold: 0.1 } // Trigger animation when 10% of the element is visible
		);

		if (textRef.current) {
			observer.observe(textRef.current);
		}

		// Cleanup observer on component unmount
		return () => {
			if (textRef.current) {
				observer.unobserve(textRef.current);
			}
		};
	}, []);

	return (
		<div className="flex flex-col items-center bg-black">
			{/* Navbar component */}
			<NavbarDemo />

			{/* 3D Canvas container */}
			<div className="w-full h-[460px] bg-black mt-16"> {/* Added margin to account for the fixed navbar */}
				<Canvas camera={{ fov: 30 }}>
					<OrbitControls enableZoom={false} />
					<ambientLight />
					<PictureInCyl />
				</Canvas>
			</div>

			{/* New div below the animation */}
			<div
				ref={textRef} // Attach ref to the div
				className="w-full h-[900px] bg-black flex justify-center "
			>
				<p className=" text-center text-4xl font-semibold text-white ">{text}</p>
			</div>
		</div>
	);
};

export default Banner;
