import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";



interface GeminiApiSocialMediaPostGenerationParams {
	platform: string;
	contentType: string;
	objective: string;
	brandName: string;
}
export async function GeminiApiSocialMediaPostGeneration(params: GeminiApiSocialMediaPostGenerationParams) {

	console.log("generative ai prompt hitting")

	console.log(params.brandName);
	console.log(params.contentType, params.objective, params.platform);

	const prompt =
		`Create a list of five social media posts for ${params.platform}, formatted as a single string. Each post should be separated by '||'. These posts are for a brand social media campaign with the objective of ${params.objective} and should cater to a diverse audience on ${params.platform}. Focus on universal themes that encourage ${params.contentType}, and engaging interaction, while aligning with the brand's identity, ${params.brandName}. Avoid repetitive topics or formats. Use a mix of famous quotes, wordplay, and creative comparisons that are relatable to the audience. For example, your output should look like this: 'Our components are like biryani: perfectly layered and packed with flavor.||Travel back in time to a simpler era of coding. TypeScript, powered by Accernity UI, will make it happen.||Who says beautiful design can't be fast? Our components are so sleek, they could give Usain Bolt a run for his money. 🏃💨 ||They say don’t judge a book by its cover, but we’re definitely judging UIs by their design. 📚✨ With Accernity UI, you’ll have a bestseller! What’s the ‘cover’ of your latest project?' || Create diverse posts that reflect the brand's identity, ${params.brandName}, and resonate with the platform's audience, ensuring each post is unique and engaging.`


	const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

	const model = genAI.getGenerativeModel({
		model: "gemini-1.5-flash-latest",
		generationConfig: { maxOutputTokens: 200 },
	});

	try {

		const result = await model.generateContent(prompt);

		const response = result.response;

		const text = response.text();

		console.log(text);

		return text;
	} catch (error) {
		console.log("ai error", error)
		return NextResponse.json({
			text: "Unable to process the prompt. Please try again.",
		});
	}
}
