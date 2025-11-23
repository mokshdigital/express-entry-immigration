'use client';

import { useState } from 'react';
import { FileText, CheckCircle, ListOrdered } from 'lucide-react';

interface ServiceTabsProps {
    overview: string;
    requirements: string;
    process: string;
}

export function ServiceTabs({ overview, requirements, process }: ServiceTabsProps) {
    const [activeTab, setActiveTab] = useState<'overview' | 'requirements' | 'process'>('overview');

    const tabs = [
        { id: 'overview' as const, label: 'Overview', icon: FileText },
        { id: 'requirements' as const, label: 'Requirements', icon: CheckCircle },
        { id: 'process' as const, label: 'Process', icon: ListOrdered },
    ];

    return (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            {/* Tab Headers */}
            <div className="flex border-b border-gray-200">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium transition-colors ${activeTab === tab.id
                                    ? 'bg-brand-navy text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{tab.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Tab Content */}
            <div className="p-8">
                {activeTab === 'overview' && (
                    <div
                        className="prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: overview }}
                    />
                )}
                {activeTab === 'requirements' && (
                    <div
                        className="prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: requirements }}
                    />
                )}
                {activeTab === 'process' && (
                    <div
                        className="prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: process }}
                    />
                )}
            </div>
        </div>
    );
}
