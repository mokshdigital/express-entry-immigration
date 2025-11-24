import React from 'react';

interface ContactNotificationProps {
    name: string;
    email: string;
    phone?: string;
    serviceType?: string;
    message: string;
}

export function ContactNotificationEmail({
    name,
    email,
    phone,
    serviceType = 'general',
    message,
}: ContactNotificationProps) {
    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            lineHeight: '1.6',
            color: '#333',
        }}>
            <div style={{
                backgroundColor: '#003366',
                color: 'white',
                padding: '20px',
                borderRadius: '8px 8px 0 0',
            }}>
                <h1 style={{ margin: 0, fontSize: '24px' }}>
                    New Contact Form Submission
                </h1>
            </div>

            <div style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
                <div style={{ marginBottom: '15px' }}>
                    <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#003366' }}>
                        Name
                    </p>
                    <p style={{ margin: 0 }}>{name}</p>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#003366' }}>
                        Email
                    </p>
                    <p style={{ margin: 0 }}>
                        <a href={`mailto:${email}`} style={{ color: '#0066cc' }}>
                            {email}
                        </a>
                    </p>
                </div>

                {phone && (
                    <div style={{ marginBottom: '15px' }}>
                        <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#003366' }}>
                            Phone
                        </p>
                        <p style={{ margin: 0 }}>{phone}</p>
                    </div>
                )}

                <div style={{ marginBottom: '15px' }}>
                    <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#003366' }}>
                        Service Type
                    </p>
                    <p style={{ margin: 0, textTransform: 'capitalize' }}>
                        {serviceType.replace('-', ' ')}
                    </p>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#003366' }}>
                        Message
                    </p>
                    <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{message}</p>
                </div>
            </div>

            <div style={{
                backgroundColor: '#f0f0f0',
                padding: '15px 20px',
                borderRadius: '0 0 8px 8px',
                fontSize: '12px',
                color: '#666',
            }}>
                <p style={{ margin: 0 }}>
                    This email was sent from the Express Entry Immigration Services contact form.
                </p>
            </div>
        </div>
    );
}