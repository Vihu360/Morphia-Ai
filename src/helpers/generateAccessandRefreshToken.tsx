import UserModel from "@/models/Users";

const generateAccessandRefreshToken = async (userId: string) => {
	try {
		const user = await UserModel.findById(userId);
		if (!user) {
			throw new Error("User not found");
		}
		const accessToken = user.generateAccessToken();
		const refreshToken = user.generateRefreshToken();
		user.refreshToken = refreshToken;
		await user.save();
		console.log("refresh token", refreshToken);
		return { accessToken, refreshToken };
	} catch (error) {
		console.error("Failed to generate access token:", error);
		throw error;
	}
};

export default generateAccessandRefreshToken
