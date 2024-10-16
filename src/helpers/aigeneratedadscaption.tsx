import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";



interface GeminiApiAdCaptionGenerationParams {
	platform: string;
	contentType: string;
	adGoal: string;
	targetAudience: string;
	language: string;
	keywords: string;
	brandName: string;
	brandDescription: string;
}
export async function aiGeneratedAdsCaption(params: GeminiApiAdCaptionGenerationParams) {

	console.log("generative ai prompt hitting")


	const prompt =
		`Generate a list of five unique and creative ad captions to be used over images on ${params.platform} for ${params.brandName} ad campaign, formatted as a single string with each post separated by '||'. ${params.brandDescription}. The goal of these ads captions is to ${params.adGoal} in terms of ${params.contentType}. The captions should be creative, engaging, and reflect ${params.brandName} brand identity and values. Each caption should cater to the ${params.contentType} and ${params.adGoal}, using wordplay, creative comparisons, relatable humour, and the target audience would be ${params.targetAudience} (if applicable). Ensure that every response is unique, short (under 100 characters), and aligned with current trends, while delivering distinct ideas in every iteration to encourage lead generation and brand awareness. The language of the texts should be ${params.language}.  Also include these keywords here ${params.keywords} (if applicable, means if keywords =! 'null' or 'undefined) . Generate just these captions, just simple the creative texts for the ads. Do not include any hastags and do not repeat the content what you created before. Most importantly do not include anything like caption1, caption 2 or 1., 2. etc like this. Do not even use number to list it, just straight answer that i asked.`


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
