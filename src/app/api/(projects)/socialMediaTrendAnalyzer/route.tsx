import { takingUserFromRefreshToken } from "@/helpers/takingUserFromRefreshToken";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	await dbConnect();

	try {

		const refreshToken = request.cookies.get('refreshToken')?.value;

		const user = takingUserFromRefreshToken(refreshToken);

		if (!user) {
			return NextResponse.json({ success: false, message: "Please login/signup first" }, { status: 400 });
		}



	} catch (error) {

	}
}
