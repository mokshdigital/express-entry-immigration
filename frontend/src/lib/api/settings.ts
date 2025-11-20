/**
 * ACF Options/Settings API functions
 */

import { ACF_ENDPOINTS } from './config';
import { fetchAPI } from './fetcher';
import {
    HeroSettings,
    NavigationSettings,
    ContactSettings,
    SocialLinks,
    SEOSettings,
    SiteSettings,
} from '@/types/wordpress';

/**
 * Get Hero Settings
 */
export async function getHeroSettings(): Promise<HeroSettings> {
    return fetchAPI<HeroSettings>(ACF_ENDPOINTS.heroSettings);
}

/**
 * Get Navigation Settings
 */
export async function getNavigationSettings(): Promise<NavigationSettings> {
    return fetchAPI<NavigationSettings>(ACF_ENDPOINTS.navigationSettings);
}

/**
 * Get Contact Settings
 */
export async function getContactSettings(): Promise<ContactSettings> {
    return fetchAPI<ContactSettings>(ACF_ENDPOINTS.contactSettings);
}

/**
 * Get Social Links
 */
export async function getSocialLinks(): Promise<SocialLinks> {
    return fetchAPI<SocialLinks>(ACF_ENDPOINTS.socialLinks);
}

/**
 * Get SEO Settings
 */
export async function getSEOSettings(): Promise<SEOSettings> {
    return fetchAPI<SEOSettings>(ACF_ENDPOINTS.seoSettings);
}

/**
 * Get Site Settings
 */
export async function getSiteSettings(): Promise<SiteSettings> {
    return fetchAPI<SiteSettings>(ACF_ENDPOINTS.siteSettings);
}