import mongoose, { Schema, Document } from 'mongoose';


// mongoose interface

export interface CompetitorAnalysis extends Document {
	brandName: string;
	competitorName: string;
	postFrequency: {
		postsPerWeek: number;
	};
	engagementRates: {
		likes: number;
		comments: number;
		shares: number;
		averageEngagementRate: number; // Calculated field based on other metrics
	};
	contentTypes: {
		images: number;
		videos: number;
		articles: number;
		others: number;
	};
	analyzedAt: Date;
}

// Mongoose data schema

const CompetitorAnalysisSchema: Schema<CompetitorAnalysis> = new Schema({
	brandName: {
		type: String,
		required: [true, "Brand name is required"],
		trim: true
	},
	competitorName: {
		type: String,
		required: [true, "Competitor name is required"],
		trim: true
	},
	postFrequency: {
		postsPerWeek: {
			type: Number,
			required: true,
			min: [0, "Posts per week cannot be negative"],
			default: 0
		}
	},
	engagementRates: {
		likes: {
			type: Number,
			min: [0, "Likes cannot be negative"],
			default: 0
		},
		comments: {
			type: Number,
			min: [0, "Comments cannot be negative"],
			default: 0
		},
		shares: {
			type: Number,
			min: [0, "Shares cannot be negative"],
			default: 0
		},
		averageEngagementRate: {
			type: Number,
			min: [0, "Average engagement rate cannot be negative"],
			default: 0
		}
	},
	contentTypes: {
		images: { type: Number, min: 0, default: 0 },
		videos: { type: Number, min: 0, default: 0 },
		articles: { type: Number, min: 0, default: 0 },
		others: { type: Number, min: 0, default: 0 }
	},
	analyzedAt: {
		type: Date,
		default: Date.now
	}
});

// Calculate averageEngagementRate before saving

CompetitorAnalysisSchema.pre('save', function (next) {
	const doc = this as CompetitorAnalysis;
	const { likes, comments, shares } = doc.engagementRates;
	const { postsPerWeek } = doc.postFrequency;

	if (postsPerWeek > 0) {
		doc.engagementRates.averageEngagementRate = (likes + comments + shares) / postsPerWeek;
	} else {
		doc.engagementRates.averageEngagementRate = 0;
	}

	next();
});

const CompetitorAnalysisModel = mongoose.model<CompetitorAnalysis>('CompetitorAnalysis', CompetitorAnalysisSchema);

export default CompetitorAnalysisModel;
