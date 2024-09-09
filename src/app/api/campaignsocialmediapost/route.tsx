import { takingUserFromRefreshToken } from "@/helpers/takingUserFromRefreshToken";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import BrandSetupModel from "@/models/BrandSetup";
import CampaignSocialMediaPostModel from "@/models/CampaignModel";
import { GeminiApiSocialMediaPostGeneration } from "@/helpers/geminiApiSocialMediaPostGeneration"

export async function POST(request: NextRequest) {
	await dbConnect();

	try {
		const refreshToken = request.cookies.get("refreshToken")?.value;
		const user = await takingUserFromRefreshToken(refreshToken);

		if (!user) {
			return NextResponse.json({ success: false, message: "User not found" }, { status: 400 });
		}

		// Extract input data from the request body
		const { brandName, platform, contentType, objective } = await request.json();

		// Validate the platform and content type input
		const validPlatforms = ["Facebook", "Instagram", "LinkedIn", "Twitter"];
		const validContentTypes = ["Ad Campaign", "Social Post", "Story"];

		if (!validPlatforms.includes(platform) || !validContentTypes.includes(contentType)) {
			return NextResponse.json({ success: false, message: "Invalid platform or content type" }, { status: 400 });
		}

		// Find the brand by name and user ID
		const brand = await BrandSetupModel.findOne({ userId: user._id, brandName });
		if (!brand) {
			return NextResponse.json({ success: false, message: "Brand not found" }, { status: 404 });
		}

		// Calculate expiry date for the campaign (one week from now)
		const expiryDate = new Date();
		expiryDate.setDate(expiryDate.getDate() + 7);

		// Create a new campaign with the provided details and set an expiry date
		const newCampaign = new CampaignSocialMediaPostModel({
			userId: user._id,
			brandName: brand._id,
			name: `${brand.brandName} Campaign`, // Customize the name as needed
			platform,
			contentType,
			objective,
			targetAudience: {}, // Customize or extract targetAudience from user input if needed
			expiresAt: expiryDate, // New field for expiry
		});

		await newCampaign.save();

		// Send data to Gemini AI API for content generation
		const generatedContent = await GeminiApiSocialMediaPostGeneration({
			platform,
			contentType,
			objective,
			brandName: brand.brandName,
		});

		// Return the generated content back to the user
		return NextResponse.json(
			{
				success: true,
				message: "Campaign created",
				content: generatedContent,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log("Error in API:", error);
		return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
	}
}
