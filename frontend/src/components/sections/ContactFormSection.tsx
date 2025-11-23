import { getServiceCategories } from '@/lib/api';
import { ContactForm } from '@/components/forms/ContactForm';

export default async function ContactFormSection() {
    const categories = await getServiceCategories();

    return <ContactForm categories={categories} />;
}
