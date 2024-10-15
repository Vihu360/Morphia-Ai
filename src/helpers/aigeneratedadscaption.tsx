import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";



interface GeminiApiAdCaptionGenerationParams {
	platform: string;
	contentType: string;
	adGoal: string;
	additionalInfo: string;
	brandName: string;
	brandDescription: string;
}
export async function aiGeneratedAdsCaption(params: GeminiApiAdCaptionGenerationParams) {

	console.log("generative ai prompt hitting")


	const prompt =
		`Generate a list of five unique and creative ad captions to be used over images on ${params.platform} for ${params.brandName} social media campaign, formatted as a single string with each post separated by '||'. ${params.brandDescription}. The goal of these humorous captions is to generate more leads, drive engagement, and reflect ${params.brandName} brand identity and values. Each caption should cater to the ${params.contentType} and ${params.adGoal}, using wordplay, creative comparisons, relatable humor, and industry-specific humor (if applicable). Ensure that every response is unique, short (under 100 characters), and aligned with current trends, while delivering distinct ideas in every iteration to encourage lead generation and brand awareness. Generate just these captions, just simple the creative texts for the ads. Do not include any hastags and do not repeat the content what you created before`


	const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

	const model = genAI.getGenerativeModel({
		model: "gemini-1.5-flash-latest",
		generationConfig: { maxOutputTokens: 200 },
	});

	try {

		const result = await model.generateContent(prompt);

		const response = result.response;

		const text = response.text();

		return text;
	} catch (error) {
		console.log("ai error", error)
		return NextResponse.json({
			text: "Unable to process the prompt. Please try again.",
		});
	}
}
