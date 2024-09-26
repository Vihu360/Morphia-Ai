import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";



interface GeminiApiSocialMediaPostGenerationParams {
	platform: string;
	contentType: string;
	objective: string;
	brandName: string;
	brandDescription: string;
}
export async function GeminiApiSocialMediaPostGeneration(params: GeminiApiSocialMediaPostGenerationParams) {

	console.log("generative ai prompt hitting")


	const prompt =
		`Generate a list of five unique and engaging social media posts for ${ params.platform }, formatted as a single string with each post separated by '||'.These posts are part of a brand social media campaign for ${ params.brandName } with the following details: Campaign Objective: ${ params.objective }, Content Type: ${ params.contentType }, Brand Description: ${ params.brandDescription }.Guidelines: 1. Cater to a diverse audience on ${ params.platform }; 2. Focus on universal themes that encourage ${ params.contentType } and user interaction; 3. Align with ${ params.brandName } s identity and values as described in the brand description; 4. Use a mix of: famous quotes, wordplay, creative comparisons, relatable scenarios, and industry-specific humor (if applicable); 5. Incorporate calls-to-action that prompt audience engagement; 6. Ensure each post is distinct in topic and format; 7. Adapt the tone and style to suit ${params.platform}'s typical content.Consider the brand's unique selling points, target audience preferences, and current trends on ${params.platform} when crafting the posts. Aim for a balance of informative, entertaining, and inspiring content that reflects the brand's personality and resonates with the audience.Example output format: 'Witty post relating ${params.brandName} to a popular culture reference #Hashtag || Inspirational quote connected to ${params.brandName}'s values #BrandedHashtag || Creative comparison between ${ params.brandName } 's product/service and an everyday object || Question that encourages audience interaction related to ${params.contentType} || Call-to-action post highlighting a key feature or benefit of ${params.brandName}. Do not give any explaintaion, just what i asked, straight forward. Do not even use number to list it, just straight answer that i asked.`


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
