import { takingUserFromRefreshToken } from "@/helpers/takingUserFromRefreshToken";
import dbConnect from "@/lib/dbConnect";
import BrandSetupModel from "@/models/BrandSetup";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
	await dbConnect();

	try {
		const refreshToken = request.cookies.get("refreshToken")?.value;
		const user = await takingUserFromRefreshToken(refreshToken);

		if (!user) {
			return NextResponse.json({ success: false, message: "Please login/signup first" }, { status: 400 });
		}

		const { id } = await request.json();

		const findRequestedBrand = await BrandSetupModel.findOne({
			userId: user._id,
			_id: id,
		});

		if (!findRequestedBrand) {
			return NextResponse.json({ success: false, message: "The Brand you are trying to delete is not found" }, { status: 404 });
		}

		await BrandSetupModel.findByIdAndDelete(id);


		return NextResponse.json({
			success: true,
			message: "Brand deleted successfully"
		},
			{ status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ success: false, message: "An error occurred during signin" },
			{ status: 500 }
		);
	}

}
