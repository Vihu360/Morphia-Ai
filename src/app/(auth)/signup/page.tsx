"use client";
import React, {useState} from "react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { cn } from "@/lib/utils";
import {
	IconBrandGithub,
	IconBrandGoogle,
	IconBrandOnlyfans,
} from "@tabler/icons-react";
import axios, {AxiosError} from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { apiResponse } from "@/types/ApiResponse";
import { Loader2 } from 'lucide-react';

export default function SignupForm() {

	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const { toast } = useToast()
	const router = useRouter();



	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setIsSubmitting(true)

		try {

			const response = await axios.post("/api/signup", {
				email: e.currentTarget.email.value,
				password: e.currentTarget.password.value,
			})

			console.log(response.data)

			toast({
				title: "Success",
				description: response.data.message,
			})

			router.replace(`/verify/`)
			setIsSubmitting(false);

		} catch (error) {

			const axiosError = error as AxiosError<apiResponse>

			const errorMessage = axiosError.response?.data.message ?? ('There was a problem with sign up. Please try again.')

			toast({
				title: "error",
				description: errorMessage
			})

			setIsSubmitting(false);

		}
	};
	return (
		<div className="w-full h-screen bg-black shadow-input flex justify-center items-center">
			<div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 bg-black dark:bg-black  md:shadow-2xl md:shadow-slate-800	">
			<h2 className="font-bold text-xl text-neutral-200">
				Let's gets you <span className="animate-pulse">STARTED</span>
			</h2>

			<form className="my-8" onSubmit={handleSubmit}>
				<LabelInputContainer className="mb-4">
					<Label htmlFor="email">Email Address</Label>
					<Input required id="email" placeholder="helloSWATI@gmail.com" type="email" />
				</LabelInputContainer>
				<LabelInputContainer className="mb-4">
					<Label htmlFor="password">Password</Label>
					<Input required id="password" placeholder="••••••••" type="password" />
				</LabelInputContainer>

					<button
						className="bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium border border-zinc-800 shadow-[0px_-1px_0px_0px_var(--zinc-800)_inset]"
						type="submit"
					>
						<span className="flex items-center justify-center">
							{isSubmitting ? (
								<Loader2 className="w-4 h-4 mr-2 animate-spin" />
							) : (
								<>
									<span>Sign up</span>
									<span className="ml-2">&rarr;</span>
								</>
							)}
						</span>
						<BottomGradient />
					</button>


					<div className="flex gap-2 items-center justify-center   my-6">
						<p className="text-neutral-300">Already have an account?</p>
						<p className="text-neutral-300 cursor-pointer hover:underline hover:underline-offset-2">Sign In</p>
					</div>

				<div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mb-6 h-[1px] w-full" />

				<div className="flex flex-col space-y-4">
					<button
						className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-white rounded-md h-10 font-medium  bg-zinc-900 "
						type="submit"
					>
						<IconBrandGithub className="h-4 w-4 text-neutral-300" />
						<span className="text-neutral-300 text-sm">
							GitHub
						</span>
						<BottomGradient />
					</button>
					<button
						className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-white rounded-md h-10 font-medium  bg-zinc-900 "
						type="submit"
					>
						<IconBrandGoogle className="h-4 w-4 text-neutral-300" />
						<span className="text-neutral-300 text-sm">
							Google
						</span>
						<BottomGradient />
					</button>
					<button
						className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium  bg-zinc-900 "
						type="submit"
					>
						<IconBrandOnlyfans className="h-4 w-4 text-neutral-300" />
						<span className="text-neutral-300 text-sm">
							OnlyFans
						</span>
						<BottomGradient />
					</button>
				</div>
			</form>
			</div>
		</div>
	);
}

const BottomGradient = () => {
	return (
		<>
			<span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
			<span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
		</>
	);
};

const LabelInputContainer = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<div className={cn("flex flex-col space-y-2 w-full", className)}>
			{children}
		</div>
	);
};
