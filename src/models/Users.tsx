import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface User extends Document {
	email: string;
	password: string;
	fullName: string;
	refreshToken: string;
	createdAt: Date;
	updatedAt: Date;
	isVerified: boolean;
	verifyCode: string;
	verifyCodeExpiry: Date;
	isPasswordCorrect(password: string): Promise<boolean>;
	generateAccessToken(): string;
	generateRefreshToken(): string;
}

const userSchema: Schema<User> = new Schema(
	{
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			match: [/\S+@\S+\.\S+/, 'Please use a valid email id'],
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
			required: [true, "Password is required"]
		},
		fullName: {
			type: String,
			required: [true, "Full name is required"]
		},
		refreshToken: {
			type: String
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		verifyCode: {
			type: String,
			required: [true, "Verify code is required"],
		},
		verifyCodeExpiry: {
			type: Date,
			required: [true, "Verify code expiry is required"],
		},
	},
	{
		timestamps: true
	}
);

userSchema.pre('save', async function (next) {
	if (!this.isModified("password")) return next();
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

userSchema.methods.isPasswordCorrect = async function (password: string): Promise<boolean> {
	return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function (): string {
	const secret = process.env.ACCESS_TOKEN_SECRET ?? 'fallback_access_secret';
	const expiresIn = process.env.ACCESS_TOKEN_EXPIRY ?? '1h';

	return jwt.sign(
		{
			_id: this._id,
			email: this.email,
			fullName: this.fullName,
		},
		secret,
		{ expiresIn }
	);
};

userSchema.methods.generateRefreshToken = function (): string {
	const secret = process.env.REFRESH_TOKEN_SECRET ?? 'fallback_refresh_secret';
	const expiresIn = process.env.REFRESH_TOKEN_EXPIRY ?? '7d';

	return jwt.sign(
		{
			_id: this._id,
		},
		secret,
		{ expiresIn }
	);
};

const UserModel = mongoose.models.User || mongoose.model<User>('User', userSchema);

export default UserModel;
