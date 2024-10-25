import axios from 'axios';
import * as cheerio from 'cheerio';
import dbConnect from "@/lib/dbConnect";
import BrandSetupModel from "@/models/BrandSetup";
import { NextRequest, NextResponse } from "next/server";
import { takingUserFromRefreshToken } from '@/helpers/takingUserFromRefreshToken';

export async function POST(req: NextRequest) {
	await dbConnect();

	try {

		// take the user to extract user id and tell number of limited brands allowed

		const refreshToken = req.cookies.get('refreshToken')?.value;

		const user = await takingUserFromRefreshToken(refreshToken);

		console.log(refreshToken);

		if (!user) {
			return NextResponse.json({
				success: false,
				message: "Please login/signup first",
			}, { status: 400 });
		}

		console.log("user", user)

		const checkingLimitedCreationBrand = await BrandSetupModel.find({ userId: user._id });


		if (user.premiumType === "free" && checkingLimitedCreationBrand.length >= 1) {
			return NextResponse.json({
				success: false,
				message: "More than 1 brands are not allowed, please UPGRADE",
			}, { status: 400 });
		}

		if (user.premiumType === "standard" && checkingLimitedCreationBrand.length >= 3) {
			return NextResponse.json({
				success: false,
				message: "More than 3 brands are not allowed, please UPGRADE",
			}, { status: 400 });
		}

		if ( user.premiumType === "valuable" && checkingLimitedCreationBrand.length >= 6) {
			return NextResponse.json({
				success: false,
				message: "More than 6 brands are not allowed",
			}, { status: 400 });
		}

		//

		const { brandLink } = await req.json();

		if (!brandLink) {
			return NextResponse.json({
				success: false,
				message: "Brand link is required",
			}, { status: 400 });
		}

		// Ensure the brandLink is a valid URL
		const formattedBrandLink = brandLink.startsWith('http://') || brandLink.startsWith('https://')
			? brandLink
			: `https://${brandLink}`;


		// Fetch the HTML content of the brand link
		const { data } = await axios.get(formattedBrandLink);

		// Load the HTML into cheerio
		const $ = cheerio.load(data);

		// Extract information using appropriate selectors
		const brandName = $('meta[property="og:site_name"]').attr('content')?? $('title').text() ?? "Default Brand Name";
		const brandLogo = $('link[rel="icon"]').attr('href') ?? "default-logo.png";
		const industry = $('meta[name="industry"]').attr('content') ?? "Unknown";
		const brandDescription = $('meta[name="description"]').attr('content') ?? "No description available.";

		// Create a new brand setup document
		const newBrandCreation = new BrandSetupModel({
			userId: user._id,
			brandName,
			brandLink: formattedBrandLink,
			brandLogo,
			industry,
			brandDescription,
		});

		await newBrandCreation.save();

		return NextResponse.json({
			success: true,
			message: "Brand created successfully",
		}, { status: 200 });


	} catch (error) {
		console.error('Error details:', error); // Log detailed error for debugging
		return NextResponse.json({
			success: false,
			message: "Something went wrong",
		}, { status: 500 });
	}
}
