import React from 'react'
import { IconPlus } from '@tabler/icons-react';

interface CustomButtonProps {
	text: string;
	Icon?: React.ComponentType<any>;
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CustomButtom: React.FC<CustomButtonProps> = ({ text, Icon, onClick }) => {

	return (
		<>

			<button className="py-4" onClick={onClick}>
				<div className="p-3 py-2 flex justify-center text-white items-center bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-full rounded-md h-10 border border-zinc-800 shadow-[0px_-1px_0px_0px_var(--zinc-800)_inset] ">
					{/* Render Icon only if it's passed as a prop */}
					{Icon && <Icon stroke={2} size={20} color="white" />}
					<p className="ml-2">{text}</p>
					<BottomGradient />
				</div>
			</button>
</>
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

export default CustomButtom
