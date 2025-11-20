'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { Service } from '@/types/wordpress';

interface ServiceCategoryTabsProps {
    services?: Service[];
}

const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'study', label: 'Study Permits' },
    { id: 'work', label: 'Work Permits' },
    { id: 'pr', label: 'Permanent Residency' },
    { id: 'visitor', label: 'Visitor Visas' },
    { id: 'citizenship', label: 'Citizenship' },
    { id: 'other', label: 'Other Services' },
];

export function ServiceCategoryTabs({ services = [] }: ServiceCategoryTabsProps) {
    const [activeTab, setActiveTab] = useState('all');
    const [filteredServices, setFilteredServices] = useState<Service[]>(services);

    useEffect(() => {
        if (activeTab === 'all') {
            setFilteredServices(services);
        } else {
            setFilteredServices(
                services.filter(service => service.acf?.service_category === activeTab)
            );
        }
    }, [activeTab, services]);

    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-7 mb-8">
                {categories.map(category => (
                    <TabsTrigger key={category.id} value={category.id}>
                        {category.label}
                    </TabsTrigger>
                ))}
            </TabsList>

            {categories.map(category => (
                <TabsContent key={category.id} value={category.id} className="space-y-6">
                    {filteredServices.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600">No services found in this category.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredServices.map(service => (
                                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <CardTitle className="text-xl text-brand-navy">
                                            {service.title.rendered}
                                        </CardTitle>
                                        <CardDescription>
                                            {service.excerpt.rendered
                                                .replace(/<[^>]*>/g, '')
                                                .substring(0, 120)}
                                            ...
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Button asChild variant="outline" className="w-full group">
                                            <Link href={`/services/${service.acf?.service_category}`}>
                                                Learn More
                                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </TabsContent>
            ))}
        </Tabs>
    );
}
