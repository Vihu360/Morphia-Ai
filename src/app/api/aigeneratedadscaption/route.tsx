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

		const { brandData, platform, contentType, adGoal, targetAudience, language, keywords } = await request.json();


		if (!brandData || !platform || !contentType || !adGoal ) {
			return NextResponse.json({ success: false, message: "Please fill all the fields" }, { status: 400 });
		}

		console.log(user);

		console.log(platform);
		console.log(contentType);
		console.log(adGoal);
		console.log(targetAudience);
		console.log(language);
		console.log(keywords);

		console.log("branddata", brandData)
		console.log("brandid", brandData._id)
		console.log(user.id)

		const brand = await BrandSetupModel.findOne({
			userId: user._id,
			_id: brandData.id
		});

		if (!brand) {
			return NextResponse.json({ success: false, message: "Your Brand not found, Please add your brand first" }, { status: 404 });
		}

		console.log("brand", brand)


		const generatedContentResponse = await aiGeneratedAdsCaption({
			platform,
			brandName: brand.brandName,
			contentType,
			adGoal,
			targetAudience,
			language,
			keywords,
			brandDescription: brand.brandDescription
		});

		console.log("generatedcontentresponse",generatedContentResponse);

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

		console.log(error)

		return NextResponse.json({ success: false, message: "Failed to generate ads caption" }, { status: 500 });

	}

}
