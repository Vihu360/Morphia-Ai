import { NextResponse } from "next/server";
import { JwtPayload } from "@/types/ApiResponse";
import jwt from 'jsonwebtoken';
import UserModel from "@/models/Users";



export const takingUserFromRefreshToken = async (refreshToken: any) => {

	if (!refreshToken) {
		return NextResponse.json(
			{ success: false, message: "No refresh token found" },
			{ status: 400 }
		);
	}

	// Verify the refresh token
	const secret = process.env.REFRESH_TOKEN_SECRET ?? 'fallback_refresh_secret';
	let decoded: JwtPayload;

	try {
		decoded = jwt.verify(refreshToken, secret) as JwtPayload;
	} catch (error) {
		console.error('Token verification failed:', error);
		return NextResponse.json(
			{ success: false, message: "Invalid refresh token" },
			{ status: 401 }
		);
	}

	// Find the user and through refresh token
	const user = await UserModel.findById(decoded._id);

	return user;

}
