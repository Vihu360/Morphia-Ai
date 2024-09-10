import mongoose, {Schema, Document} from "mongoose";


// mongoose interface

export interface aiGeneratedContentBackup extends Document {
	userId: string
	brandName: string
	aiGeneratedContent: string
	createdAt: Date
	updatedAt: Date
	expiresAt: Date
}


// Mongoose data schema

const aiGeneratedContentBackupSchema: Schema<aiGeneratedContentBackup> = new Schema({
	userId: {
		type: String,
		required: [true, "User id is required"]
	},
	brandName: {
		type: String,
	},
	aiGeneratedContent: {
		type: String,
		required: [true, "AI generated content is required"]
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	},
	expiresAt: {
		type: Date,
		default: Date.now
	}
});

const AiGeneratedContentBackup = mongoose.models.aiGeneratedContentBackup || mongoose.model<aiGeneratedContentBackup>('aiGeneratedContentBackup', aiGeneratedContentBackupSchema);

export default AiGeneratedContentBackup;
