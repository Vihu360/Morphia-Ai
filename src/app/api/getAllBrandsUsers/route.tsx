import { takingUserFromRefreshToken } from "@/helpers/takingUserFromRefreshToken";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import BrandSetupModel from "@/models/BrandSetup";


export async function GET(req: NextRequest) {
	await dbConnect();

	try {

		const refreshToken = req.cookies.get('refreshToken')?.value;


		const user = await takingUserFromRefreshToken(refreshToken);

		if(!refreshToken || !user) {
			return NextResponse.json({
				success: false,
				message: "Please login/signup first"
			})
		}

		const findAllCreatedBrandsdata = await BrandSetupModel.find({ userId: user?._id });

		if(!findAllCreatedBrandsdata) {
			return NextResponse.json({
				success: false,
				message: "You have not created any brand yet, please create a brand first"
			});
		}

		console.log(findAllCreatedBrandsdata)

		const brandNames = findAllCreatedBrandsdata.map(brand => brand.brandName);

		return NextResponse.json({
			findAllCreatedBrandsdata,
			brandNames,
			success: true,
			message: "Brand listed successfully",
		}, { status: 200 });


	} catch (error) {

		console.error('Error details:', error);
		return NextResponse.json({
			success: false,
			message: "Something went wrong",
		}, { status: 500 });

	}


}
