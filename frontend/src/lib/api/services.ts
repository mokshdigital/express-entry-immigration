import { Service, ServiceCategory } from '@/types/wordpress';
import { fetchAPI } from './fetcher';
import { ENDPOINTS } from './config';

/**
 * Fetch all service categories, sorted by display order
 */
export async function getServiceCategories(): Promise<ServiceCategory[]> {
    const categories = await fetchAPI<ServiceCategory[]>(`${ENDPOINTS.service_category}?per_page=100`);

    // Sort by display order (lowest first)
    return categories.sort((a: ServiceCategory, b: ServiceCategory) => {
        const orderA = a.acf?.sc_display_order || 999;
        const orderB = b.acf?.sc_display_order || 999;
        return orderA - orderB;
    });
}

/**
 * Fetch a single service category by slug
 */
export async function getServiceCategoryBySlug(slug: string): Promise<ServiceCategory | null> {
    const categories = await fetchAPI<ServiceCategory[]>(`${ENDPOINTS.service_category}?slug=${slug}`);
    return categories[0] || null;
}

/**
 * Fetch all services with embedded media and terms
 */
export async function getServices(): Promise<Service[]> {
    return fetchAPI<Service[]>(`${ENDPOINTS.services}?_embed&per_page=100`);
}

/**
 * Fetch services by category slug
 * Services are sorted by date (oldest first) as per WordPress settings
 */
export async function getServicesByCategory(categorySlug: string): Promise<Service[]> {
    // First get the category to find its ID
    const category = await getServiceCategoryBySlug(categorySlug);
    if (!category) {
        return [];
    }

    // Fetch services for this category
    // WordPress will return them in the order specified in the post type settings (oldest first)
    return fetchAPI<Service[]>(
        `${ENDPOINTS.services}?service_category=${category.id}&_embed&per_page=100&orderby=date&order=asc`
    );
}

/**
 * Fetch a single service by category slug and service slug
 */
export async function getServiceBySlug(
    categorySlug: string,
    serviceSlug: string
): Promise<Service | null> {
    const services = await fetchAPI<Service[]>(
        `${ENDPOINTS.services}?slug=${serviceSlug}&_embed`
    );

    const service = services[0];
    if (!service) {
        return null;
    }

    // Verify the service belongs to the specified category
    const category = await getServiceCategoryBySlug(categorySlug);
    if (!category || !service.service_category.includes(category.id)) {
        return null;
    }

    return service;
}

/**
 * Get the category object for a service
 */
export async function getServiceCategory(service: Service): Promise<ServiceCategory | null> {
    if (!service.service_category || service.service_category.length === 0) {
        return null;
    }

    const categoryId = service.service_category[0];
    const category = await fetchAPI<ServiceCategory>(`${ENDPOINTS.service_category}/${categoryId}`);
    return category;
}

export interface CategoryWithServices extends ServiceCategory {
    services: Service[];
}

/**
 * Fetch all categories with their associated services
 * Optimized to make only 2 API calls
 */
export async function getServicesGroupedByCategory(): Promise<CategoryWithServices[]> {
    const [categories, services] = await Promise.all([
        getServiceCategories(),
        getServices(),
    ]);

    // Create a map of services by category ID
    const servicesByCategoryId = new Map<number, Service[]>();

    services.forEach(service => {
        if (service.service_category && service.service_category.length > 0) {
            service.service_category.forEach(catId => {
                const current = servicesByCategoryId.get(catId) || [];
                current.push(service);
                servicesByCategoryId.set(catId, current);
            });
        }
    });

    // Combine categories with their services
    return categories.map(category => ({
        ...category,
        services: servicesByCategoryId.get(category.id) || [],
    }));
}
