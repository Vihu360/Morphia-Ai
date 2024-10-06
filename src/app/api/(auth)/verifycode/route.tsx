import UserModel from "@/models/Users";
import dbConnect from "@/lib/dbConnect";
import { generateAccessandRefreshToken } from "../signin/route";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request: NextRequest) {

	await dbConnect();

	try {

		const { email, code } = await request.json()

		console.log("email, code", email, code)

		const user = await UserModel.findOne({ email: email })

		console.log(user)

		if(!user) {

			return Response.json({
				success: "false",
				message: "user not found"
			})
		}


		if (user) {

			const isCodeValid = user.verifyCode === code;
			const checkExpiry = new Date(user.verifyCodeExpiry) > new Date();

			if (user.isVerified) {
				return Response.json({
					success: "false",
					message: "user is already verified, please login"
				})
			}

			if (isCodeValid && checkExpiry) {

				user.isVerified = true;
				await user.save()

				const { accessToken, refreshToken } = await generateAccessandRefreshToken(user._id);

				interface CookieOptions {
					expires: Date;
					httpOnly: boolean;
					secure: boolean;
					sameSite: "strict" | "lax" | "none";
				}

				const option: CookieOptions = {
					expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
					httpOnly: true,
					secure: true,
					sameSite: "strict",
				};


				const response = NextResponse.json(
					{
						success: true,
						message: "Code has been verified Successfully",
					},
					{ status: 200 }
				)

				response.cookies.set("accessToken", accessToken, option);
				response.cookies.set("refreshToken", refreshToken, option);

				return response;
			}

			else if (!checkExpiry) {
				return Response.json({
					success: "false",
					message: "the code has been expired"
				},
					{
						status: 505
					})
			}
			else {
				return Response.json({
					success: "false",
					message: "the code is incorrect"
				},
					{
						status: 400
					})
			}
		}

		return Response.json({
			success: "false",
			message: "user was not found, please register first"
		})

	} catch (error) {

		console.error('Error verifying user:', error);
		return Response.json(
			{ success: false, message: 'Error verifying user' },
			{ status: 500 })
	}
}
