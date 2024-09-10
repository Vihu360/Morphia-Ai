// components/Banner.tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as three from "three";
import React from "react";

// Component to display images on different segments of a single cylinder
const PictureInCyl: React.FC = () => {
	// Load the textures for each image
	const tex1 = useTexture("/image1.png");
	const tex2 = useTexture("/image2.png");
	const tex3 = useTexture("/image3.png");
	const tex4 = useTexture("/image4.png");
	const tex5 = useTexture("/image5.png");

	// Adjust rotations to evenly space and tilt images
	const rotations: [number, number, number][] = [
		[0.1, 0, 0.05], // Slight tilt for segment 1
		[0.1, (2 * Math.PI) / 5, -0.05],  // Slight tilt for segment 2
		[0.1, (4 * Math.PI) / 5, 0.05],   // Slight tilt for segment 3
		[0.1, (6 * Math.PI) / 5, -0.05],  // Slight tilt for segment 4
		[0.1, (8 * Math.PI) / 5, 0.05],   // Slight tilt for segment 5
	];

	// Define the angular width (thetaLength) for each segment (narrower width)
	const thetaLength = (2 * Math.PI) / 5 - 0.1; // Slightly smaller angular width to make images narrower

	return (
		<>
			{/* Render five segments with different textures */}
			<mesh rotation={rotations[0]}>
				<cylinderGeometry args={[1, 1, 1, 30, 30, true, 0, thetaLength]} />
				<meshBasicMaterial map={tex1} side={three.DoubleSide} />
			</mesh>

			<mesh rotation={rotations[1]}>
				<cylinderGeometry args={[1, 1, 1, 30, 30, true, 0, thetaLength]} />
				<meshBasicMaterial map={tex2} side={three.DoubleSide} />
			</mesh>

			<mesh rotation={rotations[2]}>
				<cylinderGeometry args={[1, 1, 1, 30, 30, true, 0, thetaLength]} />
				<meshBasicMaterial map={tex3} side={three.DoubleSide} />
			</mesh>

			<mesh rotation={rotations[3]}>
				<cylinderGeometry args={[1, 1, 1, 30, 30, true, 0, thetaLength]} />
				<meshBasicMaterial map={tex4} side={three.DoubleSide} />
			</mesh>

			<mesh rotation={rotations[4]}>
				<cylinderGeometry args={[1, 1, 1, 30, 30, true, 0, thetaLength]} />
				<meshBasicMaterial map={tex5} side={three.DoubleSide} />
			</mesh>
		</>
	);
};

const Banner: React.FC = () => {
	return (
		<Canvas camera={{ fov: 36 }}>
			<OrbitControls />
			<ambientLight />
			<PictureInCyl />
		</Canvas>
	);
};

export default Banner;
