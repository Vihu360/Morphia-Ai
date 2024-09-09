import axios from 'axios';
import * as cheerio from 'cheerio';
import dbConnect from "@/lib/dbConnect";
import BrandSetupModel from "@/models/BrandSetup";
import { NextRequest, NextResponse } from "next/server";
import { takingUserFromRefreshToken } from '@/helpers/takingUserFromRefreshToken';

export async function POST(req: NextRequest) {
	await dbConnect();

	try {


		const { brandLink } = await req.json();

		console.log(brandLink)

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

		console.log(formattedBrandLink)

		// Fetch the HTML content of the brand link
		const { data } = await axios.get(formattedBrandLink);

		// Load the HTML into cheerio
		const $ = cheerio.load(data);

		// Extract information using appropriate selectors
		const brandName = $('meta[property="og:site_name"]').attr('content') || $('title').text() || "Default Brand Name";
		const brandLogo = $('link[rel="icon"]').attr('href') || "default-logo.png";
		const industry = $('meta[name="industry"]').attr('content') || "Unknown";
		const brandDescription = $('meta[name="description"]').attr('content') || "No description available.";

		// take the user to extract user id

		const refreshToken = req.cookies.get('refreshToken')?.value;

		const user = await takingUserFromRefreshToken(refreshToken)

		console.log(user)

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
