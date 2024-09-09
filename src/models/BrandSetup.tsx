import mongoose, { Schema, Document } from 'mongoose';

// mongoose interface

export interface BrandSetup extends Document {
	userId: Schema.Types.ObjectId;
	brandName: string;
	brandLink: string;
	brandLogo: string;
	brandDescription: string;
	industry: string;
	createdAt: Date;
	updatedAt: Date;
}


// Mongoose data schema

const BrandSetupschema: Schema<BrandSetup> = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	brandName: {
		type: String,
		required: [true, "Brand name is required"],
		trim: true
	},
	brandLink: {
		type: String,
		trim: true
	},
	brandLogo: {
		type: String,
		required: [true, "Brand logo is required"],
		trim: true
	},
	industry: {
		type: String,
		required: [true, "Industry is required"],
	},
	brandDescription: {
		type: String,
		required: [true, "Brand description is required"],
	}

}, { timestamps: true });


const BrandSetupModel = mongoose.models.BrandSetup || mongoose.model<BrandSetup>('BrandSetup', BrandSetupschema);
export default BrandSetupModel;
