
export interface apiResponse {
	success: boolean,
	isAcceptingMessage?: boolean,
	fullName?: string,
	message: string
}

// jwt interface

export interface JwtPayload {
	_id: string;
	[key: string]: any;  // can have addidtional properties
}

