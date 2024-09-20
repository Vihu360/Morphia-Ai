import mongoose, { Schema, Document } from 'mongoose';

// Mongoose interface
export interface CompetitorAnalysis extends Document {
	brandName: string;
	competitorName: string;
	adSpendEstimate: number;
	uniqueSellingPoints: string[];
	adFrequency: number;
	analyzedAt: Date;
	postFrequency: {
		postsPerWeek: number;
	};
	engagementRates: {
		likes: number;
		comments: number;
		shares: number;
		averageEngagementRate: number;
	};
	contentTypes: {
		videos: number;
		images: number;
		text: number;
	};
	topUsers: {
		country: string;
		count: number;
	}[];
}

// Mongoose data schema
const CompetitorAnalysisSchema: Schema<CompetitorAnalysis> = new Schema({
	brandName: {
		type: String,
		required: [true, "Brand name is required"],
		trim: true,
		index: true // Add index for faster queries
	},
	competitorName: {
		type: String,
		required: [true, "Competitor name is required"],
		trim: true,
		index: true // Add index for faster queries
	},
	adSpendEstimate: {
		type: Number,
		default: 0
	},
	uniqueSellingPoints: [String],
	adFrequency: {
		type: Number,
		default: 0
	},
	analyzedAt: {
		type: Date,
		default: Date.now,
		index: true // Add index for faster sorting and date-based queries
	},
	postFrequency: {
		postsPerWeek: {
			type: Number,
			default: 0
		}
	},
	engagementRates: {
		likes: {
			type: Number,
			default: 0
		},
		comments: {
			type: Number,
			default: 0
		},
		shares: {
			type: Number,
			default: 0
		},
		averageEngagementRate: {
			type: Number,
			default: 0
		}
	},
	contentTypes: {
		images: { type: Number, min: 0, default: 0 },
		videos: { type: Number, min: 0, default: 0 },
		text: { type: Number, min: 0, default: 0 },
	},
	topUsers: [{
		country: String,
		count: Number,
	}],
}, {
	timestamps: true // Adds createdAt and updatedAt fields
});

// Compound index for common query patterns
CompetitorAnalysisSchema.index({ brandName: 1, competitorName: 1, analyzedAt: -1 });

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

// Method to update engagement rates efficiently
CompetitorAnalysisSchema.methods.updateEngagementRates = async function (
	likes: number,
	comments: number,
	shares: number
) {
	this.engagementRates = { likes, comments, shares };
	const postsPerWeek = this.postFrequency?.postsPerWeek || 0;
	this.engagementRates.averageEngagementRate = postsPerWeek > 0
		? (likes + comments + shares) / postsPerWeek
		: 0;
	return this.save();
};

const CompetitorAnalysisModel = mongoose.model<CompetitorAnalysis>('CompetitorAnalysis', CompetitorAnalysisSchema);

export default CompetitorAnalysisModel;
