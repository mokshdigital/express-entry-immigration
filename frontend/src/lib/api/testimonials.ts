/**
 * Testimonials API functions
 */

import { ENDPOINTS } from './config';
import { fetchAPI } from './fetcher';
import { Testimonial } from '@/types/wordpress';

/**
 * Get all testimonials
 */
export async function getTestimonials(): Promise<Testimonial[]> {
    const url = `${ENDPOINTS.testimonials}?per_page=100`;
    return fetchAPI<Testimonial[]>(url);
}

/**
 * Get featured testimonials only
 */
export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
    const testimonials = await getTestimonials();

    return testimonials.filter(
        testimonial => testimonial.acf?.featured === true
    );
}

/**
 * Get testimonials by case type
 */
export async function getTestimonialsByCaseType(caseType: string): Promise<Testimonial[]> {
    const testimonials = await getTestimonials();

    return testimonials.filter(
        testimonial => testimonial.acf?.case_type === caseType
    );
}