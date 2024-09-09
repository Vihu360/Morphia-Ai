import UserModel from "@/models/Users";
import dbConnect from "@/lib/dbConnect";


export async function POST(request: Request) {

	await dbConnect();

	try {

		const { email, code } = await request.json()

		const user = await UserModel.findOne({ email: email })

		console.log(user)

		if(!user) {

			return Response.json({
				success: "false",
				message: "user not found"
			})
		}


		if (user) {

			const isCodeValid = user.verifyCode === code;
			const checkExpiry = new Date(user.verifyCodeExpiry) > new Date();

			if (user.isVerified) {
				return Response.json({
					success: "false",
					message: "user is already verified, please login"
				})
			}

			if (isCodeValid && checkExpiry) {

				user.isVerified = true;
				await user.save()

				return Response.json({
					success: true,
					message: "Code has been verified"
				})
			}

			else if (!checkExpiry) {
				return Response.json({
					success: "false",
					message: "the code has been expired"
				},
					{
						status: 505
					})
			}
			else {
				return Response.json({
					success: "false",
					message: "the code is incorrect"
				},
					{
						status: 400
					})
			}
		}

		return Response.json({
			success: "false",
			message: "user was not found, please register first"
		})

	} catch (error) {

		console.error('Error verifying user:', error);
		return Response.json(
			{ success: false, message: 'Error verifying user' },
			{ status: 500 })
	}
}
