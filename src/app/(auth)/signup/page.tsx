"use client";
import React, {useState} from "react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { cn } from "@/lib/utils";
import {
	IconBrandGithub,
	IconBrandGoogleFilled,
} from "@tabler/icons-react";
import axios, {AxiosError} from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from 'next/navigation';
import { apiResponse } from "@/types/ApiResponse";
import { Loader2 } from 'lucide-react';

export default function SignupForm() {

	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [isSignInclicked, setIsSignInclicked] = useState<boolean>(false);

	const { toast } = useToast()
	const router = useRouter();

	const handleSignInInterface = () => {
		if (isSignInclicked) {
			setIsSignInclicked(false)
		} else {
			setIsSignInclicked(true)
		}
	}


	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setIsSubmitting(true);

		try {
			const email = e.currentTarget.email.value;
			const password = e.currentTarget.password.value;
			const firstname = e.currentTarget.firstname?.value;
			const lastname = e.currentTarget.lastname?.value;

			if (!isSignInclicked) {

				// This block will execute when isSignInclicked is false (sign up logic)

				const fullname = `${firstname} ${lastname}`;

				const response = await axios.post("/api/signup", {
					email,
					password,
					fullName: fullname
				});

				console.log(response.data);

				toast({
					title: "Success",
					description: response.data.message,
				});

				router.replace(`/verify/${email}`);
			} else {
				// This block will execute when isSignInclicked is true (sign in logic)
				const response = await axios.post("/api/signin", {
					email,
					password
				});

				console.log(response.data);

				toast({
					title: "Success",
					description: response.data.message,
				});

				router.replace(`/brandcreate/`);
			}

		} catch (error) {
			const axiosError = error as AxiosError<apiResponse>;
			const errorMessage = axiosError.response?.data.message ?? 'There was a while sign up. Please try again.';

			toast({
				title: "Error",
				description: errorMessage
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="w-full h-screen bg-black shadow-input flex justify-center items-center">
			<div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 bg-black dark:bg-black  md:shadow-2xl md:shadow-slate-800	">
				<h2 className="font-bold text-xl text-neutral-200">
					{isSignInclicked
						? "Welcome Back ! "
						: "Let's get you "}
					<span className={isSignInclicked ? "" : "animate-pulse"}>
						{isSignInclicked ? "" : "STARTED"}
					</span>
				</h2>

				<form className="my-8" onSubmit={handleSubmit}>

					{isSignInclicked ? null :(

				<div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
						<LabelInputContainer>
							<Label htmlFor="firstname">First name</Label>
							<Input id="firstname" placeholder="Tyler" type="text" />
						</LabelInputContainer>
						<LabelInputContainer>
							<Label htmlFor="lastname">Last name</Label>
							<Input id="lastname" placeholder="Durden" type="text" />
						</LabelInputContainer>
				</div>
				)}


				<LabelInputContainer className="mb-4">
					<Label htmlFor="email">Email Address</Label>
					<Input required id="email" placeholder="hello@gmail.com" type="email" />
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
										{isSignInclicked ? (
											<span>Sign in</span>
										) : (
												<span>Sign up</span>
										) }
									<span className="ml-2">&rarr;</span>
								</>
							)}
						</span>
						<BottomGradient />
					</button>



						{isSignInclicked ? (
							<div className="flex gap-2 items-center justify-center my-6">
							<p className="text-neutral-300">Create an Account</p>
							<button onClick={handleSignInInterface} className="text-neutral-300 cursor-pointer hover:underline hover:underline-offset-2">Sign Up</button>
						</div>
					) : (
							<div className="flex gap-2 items-center justify-center my-6">
								<p className="text-neutral-300">Already have an account?</p>
								<button onClick={handleSignInInterface} className="text-neutral-300 cursor-pointer hover:underline hover:underline-offset-2">Sign In</button>
							</div>

						)
						}

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
						<IconBrandGoogleFilled  className="h-4 w-4 text-neutral-300" />
						<span className="text-neutral-300 text-sm">
							Google
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
