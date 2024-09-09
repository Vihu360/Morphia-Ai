import VerificationEmail from '../../Emails/verificationEmail';
import { apiResponse } from '@/types/ApiResponse';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY as string);


export async function sendVerificationEmail(
	fullName: string,
	email: string,
	verifyCode: string
): Promise<apiResponse> {
	try {

		const emailContent = VerificationEmail({ fullName, otp: verifyCode });

		console.log("email to be sent on:", email);

		await resend.emails.send({
			from: 'send@vivekbarnwal.cloud',
			to: email,
			subject: 'Life Verification Code',
			react: emailContent,
		});

		return { success: true, message: 'Verification email sent successfully.' };
	} catch (emailError) {
		console.error('Error sending verification email:', emailError);
		return { success: false, message: 'Failed to send verification email.' };
	}
}
