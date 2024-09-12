import { takingUserFromRefreshToken } from "@/helpers/takingUserFromRefreshToken";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import BrandSetupModel from "@/models/BrandSetup";
import { GeminiApiSocialMediaPostGeneration } from "@/helpers/geminiApiSocialMediaPostGeneration"
import aiGeneratedContentBackup from "@/models/AiGeneratedContentBackup";

export async function POST(request: NextRequest) {
	await dbConnect();

	try {
		const refreshToken = request.cookies.get("refreshToken")?.value;
		const user = await takingUserFromRefreshToken(refreshToken);

		const { brandName, platform, contentType, objective } = await request.json();

		console.log(" fetched data from ui ",brandName, platform, contentType, objective);

		if (!user) {
			return NextResponse.json({ success: false, message: "User not found" }, { status: 400 });
		}

		console.log(user);

		const brandNameToSelect = brandName;

		const brand = await BrandSetupModel.findOne({
			userId: user._id,
			brandName: brandNameToSelect,
		});

		if (!brand) {
			return NextResponse.json({ success: false, message: "Your Brand not found, Please add your brand first" }, { status: 404 });
		}

		// Validate the platform and content type input
		const validPlatforms = ["Facebook", "Instagram", "LinkedIn", "Twitter"];
		const validContentTypes = ["AdCampaign", "Social Media Post", "Story"];

		if (!validPlatforms.includes(platform) || !validContentTypes.includes(contentType)) {
			return NextResponse.json({ success: false, message: "Invalid platform or content type" }, { status: 400 });
		}

		// Send data to Gemini AI API for content generation

		const generatedContentResponse = await GeminiApiSocialMediaPostGeneration({
			platform,
			contentType,
			objective,
			brandName: brand.brandName,
		});

		if (!generatedContentResponse) {
			return NextResponse.json({ success: false, message: "Failed to generate content" }, { status: 500 });
		}

		if (typeof generatedContentResponse === 'string') {
			const generatedContent = generatedContentResponse;
			const postsArray = generatedContent.split('||').map(post => post.trim());

			console.log("Generated content:", generatedContent);
			console.log("post:", postsArray)

			// save the ai content to the database

			const pushToaiGeneratedBackup = await new aiGeneratedContentBackup({
				userId: user._id,
				brandName: brand.brandName,
				aiGeneratedContent: postsArray,
			})

			await pushToaiGeneratedBackup.save();


			// Return the generated content back to the user
			return NextResponse.json(
				{
					success: true,
					message: "Ai content generated successfully",
					content: postsArray,
				},
				{ status: 200 }
			);

		} else
		{
			return NextResponse.json({ success: false, message: "Invalid response from Gemini API" }, { status: 500 });
		}

	} catch (error) {
		console.log("Error in API:", error);
		return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
	}
}
