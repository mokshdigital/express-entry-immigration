import { Resend } from 'resend';
import { ContactNotificationEmail } from '@/lib/emails/contact-notification';
import { contactFormSchema } from '@/lib/schemas/contact';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate form data
        const validatedData = contactFormSchema.parse(body);

        // Send email to business
        const businessEmailResult = await resend.emails.send({
            from: `Contact Form <${process.env.SENDER_EMAIL || 'onboarding@resend.dev'}>`,
            to: process.env.CONTACT_EMAIL || 'info@expressentryimmigration.ca',
            subject: `New Contact Form Submission from ${validatedData.name}`,
            react: ContactNotificationEmail({
                name: validatedData.name,
                email: validatedData.email,
                phone: validatedData.phone,
                serviceType: validatedData.serviceType || 'general',
                message: validatedData.message,
            }),
        });

        if (businessEmailResult.error) {
            console.error('Error sending business email:', businessEmailResult.error);
            return Response.json(
                { error: 'Failed to send email' },
                { status: 500 }
            );
        }

        // Send confirmation email to user
        const confirmationEmailResult = await resend.emails.send({
            from: `Express Entry Immigration <${process.env.SENDER_EMAIL || 'onboarding@resend.dev'}>`,
            to: validatedData.email,
            subject: 'We Received Your Message - Express Entry Immigration Services',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #003366;">Thank You, ${validatedData.name}!</h2>
          <p>We have received your inquiry about our ${validatedData.serviceType || 'general'} services.</p>
          <p>Our immigration consultants will review your submission and contact you shortly.</p>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            Express Entry Immigration Services<br>
            info@expressentryimmigration.ca
          </p>
        </div>
      `,
        });

        if (confirmationEmailResult.error) {
            console.error('Error sending confirmation email:', confirmationEmailResult.error);
            // Still return success since the main email was sent
        }

        return Response.json(
            {
                success: true,
                message: 'Thank you for contacting us. We will be in touch soon.'
            },
            { status: 200 }
        );

    } catch (error) {
        if (error instanceof Error) {
            console.error('Form submission error:', error);
            return Response.json(
                { error: error.message },
                { status: 400 }
            );
        }

        return Response.json(
            { error: 'An unexpected error occurred' },
            { status: 500 }
        );
    }
}