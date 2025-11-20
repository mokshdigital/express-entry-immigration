'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { type NavItem } from '@/lib/navigation';

interface MobileMenuProps {
    menu: NavItem[];
}

export function MobileMenu({ menu }: MobileMenuProps) {
    const [open, setOpen] = useState(false);
    const [expandedItems, setExpandedItems] = useState<string[]>([]);

    const toggleExpanded = (label: string) => {
        setExpandedItems(prev =>
            prev.includes(label)
                ? prev.filter(item => item !== label)
                : [...prev, label]
        );
    };

    const renderMenuItem = (item: NavItem, level: number = 0) => {
        const hasChildren = item.children && item.children.length > 0;
        const isExpanded = expandedItems.includes(item.label);

        return (
            <div key={item.label} className={`${level > 0 ? 'ml-4' : ''}`}>
                <div className="flex items-center justify-between">
                    <Link
                        href={item.href}
                        className="flex-1 py-2 text-sm font-medium hover:text-brand-navy transition-colors"
                        onClick={() => !hasChildren && setOpen(false)}
                    >
                        {item.label}
                    </Link>
                    {hasChildren && (
                        <button
                            onClick={() => toggleExpanded(item.label)}
                            className="p-2"
                            aria-label={`Toggle ${item.label} submenu`}
                        >
                            {isExpanded ? (
                                <ChevronDown className="h-4 w-4" />
                            ) : (
                                <ChevronRight className="h-4 w-4" />
                            )}
                        </button>
                    )}
                </div>
                {hasChildren && isExpanded && (
                    <div className="mt-1 space-y-1">
                        {item.children?.map(child => renderMenuItem(child, level + 1))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    aria-label="Open menu"
                >
                    <Menu className="h-6 w-6" />
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto">
                <div className="flex items-center justify-between mb-8">
                    <span className="text-lg font-bold text-brand-navy">Menu</span>
                    <button
                        onClick={() => setOpen(false)}
                        className="p-2"
                        aria-label="Close menu"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <nav className="flex flex-col space-y-2">
                    {menu.map(item => renderMenuItem(item))}
                </nav>
            </SheetContent>
        </Sheet>
    );
}