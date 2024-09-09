import mongoose, { Schema, Document, ObjectId } from 'mongoose';

// mongoose interface

export interface Campaign extends Document {
	userId: ObjectId; // Reference to the User
	name: string;
	platform: string;  // e.g., "Facebook", "Instagram", "LinkedIn", "Twitter"
	contentType: string;  // e.g., "Ad Campaign", "Social Post", "Story"
	objective: string;
	brandName: Schema.Types.ObjectId;
	targetAudience: {
		interests?: string[];
		demographics?: string;
	};
	scheduledTime?: Date;
	createdAt: Date;
	updatedAt: Date;
}

// Mongoose data schema

enum Platform {
	LinkedIn = 'LinkedIn',
	Facebook = 'Facebook',
	Instagram = 'Instagram',
	Twitter = 'Twitter',
}

enum ContentType {
	AdCampaign = 'Ad Campaign',
	SocialPost = 'Social Post',
	Story = 'Story',
}


const CampaignSchema: Schema<Campaign> = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	brandName: {
		type: Schema.Types.ObjectId,
		ref: 'BrandSetup',
	},
	name: {
		type: String,
		required: [true, "Campaign name is required"],
	},
  contentType: ContentType,
	platform: Platform,
	objective: {
		type: String,
		required: [true, "Objective is required"],
	},
	targetAudience: {
		interests: {
			type: [String],
		},
		demographics: {
			type: String,
		},
	},
	scheduledTime: {
		type: Date
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	},
});

const CampaignSocialMediaPostModel = mongoose.model<Campaign>('Campaign', CampaignSchema);
export default CampaignSocialMediaPostModel;
