/**
 * API Functions Export
 * Single import point for all API functions
 */

// Posts
export {
    getPosts,
    getPostBySlug,
    getPostById,
    getRecentPosts,
} from './posts';

// Services
export {
    getServices,
    getServiceBySlug,
    getServicesByCategory,
    getServiceCategories,
} from './services';

// Testimonials
export {
    getTestimonials,
    getFeaturedTestimonials,
    getTestimonialsByCaseType,
} from './testimonials';

// FAQs
export {
    getFAQs,
    getFAQsByCategory,
    getFAQCategories,
} from './faqs';

// Stats
export {
    getStats,
} from './stats';

// Settings
export {
    getHeroSettings,
    getNavigationSettings,
    getContactSettings,
    getSocialLinks,
    getSEOSettings,
    getSiteSettings,
} from './settings';

// Configuration
export {
    WP_API_URL,
    ACF_API_URL,
    REVALIDATE_TIME,
    ENDPOINTS,
    ACF_ENDPOINTS,
} from './config';

// Error handling
export { WordPressAPIError, handleAPIError } from './errors';