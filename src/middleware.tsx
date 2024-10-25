import { NextResponse, NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
	const token = req.cookies.get('refreshToken')?.value;
	const url = req.nextUrl;

	// If the token exists and the user is trying to access signup, signin, or verify


	if (token) {
		if (
			url.pathname.startsWith('/signup') ||
			url.pathname.startsWith('/verify')
		) {
			return NextResponse.redirect(new URL('/brandcreate', req.url));
		}
		return NextResponse.next();
	}


	// If the token doesn't exist and the user is trying to access the main application

	if (!token &&
		url.pathname.startsWith('/projects') ||
		url.pathname.startsWith('/brandcreate') ||
		url.pathname.startsWith('/aicontentcreate') ||
		url.pathname.startsWith('/createads') ||
		url.pathname.startsWith('/scheduleposts') ||
		url.pathname.startsWith('/automatesocialmedia') ||
		url.pathname.startsWith('/competitoranalysis')
	) {

		return NextResponse.redirect(new URL('/signup', req.url));
	}

}
