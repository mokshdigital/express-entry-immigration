/**
 * Navigation menu structure for Express Entry Immigration
 * This defines the complete site navigation including mega menu items
 */
import { Service } from '@/types/wordpress';

export interface NavItem {
    label: string;
    href: string;
    children?: NavItem[];
    description?: string;
}

// Base navigation structure (without dynamic services)
export const baseNavigation: NavItem[] = [
    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'About',
        href: '/about',
    },
    {
        label: 'Services',
        href: '/services',
        children: [], // Will be populated dynamically
    },
    {
        label: 'News',
        href: '/news',
    },
    {
        label: 'FAQs',
        href: '/faqs',
    },
    {
        label: 'Contact',
        href: '/contact',
    },
];

// Helper to build the full navigation menu with dynamic services
export function buildNavigation(services: Service[]): NavItem[] {
    // Group services by category
    const servicesByCategory: Record<string, Service[]> = {};

    services.forEach(service => {
        const category = service.acf?.service_category || 'other';
        if (!servicesByCategory[category]) {
            servicesByCategory[category] = [];
        }
        servicesByCategory[category].push(service);
    });

    // Define category labels/order
    const categoryLabels: Record<string, string> = {
        study: 'Study',
        work: 'Work',
        pr: 'Permanent Residency',
        visitor: 'Visitor Visas',
        citizenship: 'Citizenship & PR Card',
        other: 'Other Services'
    };

    // Desired order of categories
    const categoryOrder = ['study', 'work', 'pr', 'visitor', 'citizenship', 'other'];

    // Build services menu items
    const serviceItems: NavItem[] = categoryOrder
        .filter(category => servicesByCategory[category] && servicesByCategory[category].length > 0)
        .map(category => {
            const categoryServices = servicesByCategory[category];
            const label = categoryLabels[category] || category;
            const href = `/services/${category}`;

            // Sort services by date (oldest to newest)
            const sortedServices = [...categoryServices].sort((a, b) => {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            });

            return {
                label,
                href,
                children: sortedServices.map(service => ({
                    label: service.title.rendered,
                    href: `/services/${category}`, // Link to category page as requested
                }))
            };
        });

    // Return new navigation array with populated services
    return baseNavigation.map(item => {
        if (item.label === 'Services') {
            return {
                ...item,
                children: serviceItems
            };
        }
        return item;
    });
}

// Helper function to get all service categories from the built menu
export function getServiceCategories(menu: NavItem[]): NavItem[] {
    const servicesItem = menu.find(item => item.label === 'Services');
    return servicesItem?.children || [];
}

// Helper function to flatten menu for mobile
export function flattenNavigation(items: NavItem[]): NavItem[] {
    return items.reduce((acc: NavItem[], item) => {
        acc.push(item);
        if (item.children) {
            acc.push(...flattenNavigation(item.children));
        }
        return acc;
    }, []);
}