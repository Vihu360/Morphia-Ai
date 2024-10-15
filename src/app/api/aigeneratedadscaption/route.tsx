import { aiGeneratedAdsCaption } from "@/helpers/aigeneratedadscaption";
import { takingUserFromRefreshToken } from "@/helpers/takingUserFromRefreshToken";
import dbConnect from "@/lib/dbConnect";
import BrandSetupModel from "@/models/BrandSetup";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {

	await dbConnect();

	try {

		const refreshToken = request.cookies.get("refreshToken")?.value;

		const user = await takingUserFromRefreshToken(refreshToken);

		if (!user) {
			return NextResponse.json({ success: false, message: "Please login/signup first" }, { status: 404 });
		}

		const { brandData, platform, contentType, adGoal, additionalInfo } = await request.json();


		if (!brandData || !platform || !contentType || !adGoal ) {
			return NextResponse.json({ success: false, message: "Please fill all the fields" }, { status: 400 });
		}

		console.log(user);

		console.log(brandData);


		const brand = await BrandSetupModel.findOne({
			userId: user._id,
			brandName: brandData,
		});

		if (!brand) {
			return NextResponse.json({ success: false, message: "Your Brand not found, Please add your brand first" }, { status: 404 });
		}

		const generatedContentResponse = await aiGeneratedAdsCaption({
			platform,
			brandName: brandData,
			contentType,
			adGoal,
			additionalInfo,
			brandDescription: brand.brandDescription
		});

		if (!generatedContentResponse) {
			return NextResponse.json({ success: false, message: "Failed to generate ads caption" }, { status: 500 });
		}


		if (typeof generatedContentResponse === 'string') {
			const generatedContent = generatedContentResponse;
			const postsArray = generatedContent.split('||').map(post => post.trim());

			console.log("post:", postsArray)


			return NextResponse.json(
				{
					success: true,
					message: "Ai content generated successfully",
					content: postsArray,
				},
				{ status: 200 }
			);

		} else {
			return NextResponse.json({ success: false, message: "Invalid response from AI" }, { status: 500 });
		}


	} catch (error) {

	}

}
