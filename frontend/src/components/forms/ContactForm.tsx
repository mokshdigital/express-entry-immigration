'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormData } from '@/lib/schemas/contact';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const serviceOptions = [
    { value: 'study', label: 'Study Permits' },
    { value: 'work', label: 'Work Permits' },
    { value: 'pr', label: 'Permanent Residency' },
    { value: 'visitor', label: 'Visitor Visas' },
    { value: 'citizenship', label: 'Citizenship & PR Card' },
    { value: 'other', label: 'Other Services' },
];

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        type: 'success' | 'error' | null;
        message: string;
    }>({ type: null, message: '' });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            serviceType: 'study',
            message: '',
            agreeToTerms: false,
        },
    });

    const serviceType = watch('serviceType');

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: '' });

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to submit form');
            }

            setSubmitStatus({
                type: 'success',
                message: result.message || 'Thank you! We will contact you soon.',
            });
            reset();
        } catch (error) {
            setSubmitStatus({
                type: 'error',
                message: error instanceof Error
                    ? error.message
                    : 'Failed to submit form. Please try again.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full max-w-2xl">
            {/* Success/Error Messages */}
            {submitStatus.type && (
                <div className={`p-4 rounded-lg ${submitStatus.type === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                    }`}>
                    {submitStatus.message}
                </div>
            )}

            {/* Name Field */}
            <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                    id="name"
                    placeholder="John Doe"
                    {...register('name')}
                    className={errors.name ? 'border-red-500' : ''}
                    disabled={isSubmitting}
                />
                {errors.name && (
                    <p className="text-sm text-red-600">{errors.name.message}</p>
                )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    {...register('email')}
                    className={errors.email ? 'border-red-500' : ''}
                    disabled={isSubmitting}
                />
                {errors.email && (
                    <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (416) 555-0100"
                    {...register('phone')}
                    className={errors.phone ? 'border-red-500' : ''}
                    disabled={isSubmitting}
                />
                {errors.phone && (
                    <p className="text-sm text-red-600">{errors.phone.message}</p>
                )}
            </div>

            {/* Service Type Field */}
            <div className="space-y-2">
                <Label htmlFor="serviceType">Service Type *</Label>
                <select
                    id="serviceType"
                    {...register('serviceType')}
                    className={`w-full px-3 py-2 border rounded-md text-sm ${errors.serviceType ? 'border-red-500' : 'border-gray-300'
                        } disabled:opacity-50`}
                    disabled={isSubmitting}
                >
                    {serviceOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {errors.serviceType && (
                    <p className="text-sm text-red-600">{errors.serviceType.message}</p>
                )}
            </div>

            {/* Message Field */}
            <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                    id="message"
                    placeholder="Tell us about your immigration needs..."
                    rows={5}
                    {...register('message')}
                    className={errors.message ? 'border-red-500' : ''}
                    disabled={isSubmitting}
                />
                {errors.message && (
                    <p className="text-sm text-red-600">{errors.message.message}</p>
                )}
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start space-x-2">
                <input
                    id="terms"
                    type="checkbox"
                    {...register('agreeToTerms')}
                    className="mt-1"
                    disabled={isSubmitting}
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                    I agree to the privacy policy and consent to be contacted about my inquiry *
                </label>
            </div>
            {errors.agreeToTerms && (
                <p className="text-sm text-red-600">{errors.agreeToTerms.message}</p>
            )}

            {/* Submit Button */}
            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-navy hover:bg-brand-navy/90 text-white py-3 rounded-lg font-semibold"
            >
                {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>

            <p className="text-xs text-gray-600">
                * Required fields. Your information is secure and will only be used to respond to your inquiry.
            </p>
        </form>
    );
}