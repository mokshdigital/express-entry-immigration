import { z } from 'zod';

export const contactFormSchema = z.object({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be less than 50 characters'),

    email: z.string()
        .email('Please enter a valid email address'),

    phone: z.string()
        .regex(/^[\d\s\-\+\(\)]+$/, 'Please enter a valid phone number')
        .optional()
        .or(z.literal('')),

    serviceType: z.string()
        .min(1, 'Please select a service type')
        .default('general'),

    message: z.string()
        .min(10, 'Message must be at least 10 characters')
        .max(1000, 'Message must be less than 1000 characters'),

    agreeToTerms: z.boolean()
        .refine(val => val === true, {
            message: 'You must agree to our privacy policy'
        })
});

export type ContactFormData = z.infer<typeof contactFormSchema>;