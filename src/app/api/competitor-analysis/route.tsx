import dbConnect from "@/lib/dbConnect";


export async function POST(request: Request) {

	await dbConnect();

	try {

		const { brandName } = await request.json();
		console.log(brandName);

	} catch (error) {

	}


}
