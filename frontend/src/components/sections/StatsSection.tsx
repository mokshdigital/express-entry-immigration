'use client';

import { useEffect, useRef, useState } from 'react';
import type { Stat } from '@/types/wordpress';

interface StatsSectionProps {
    stats: Stat[];
}

function useCountUp(end: number, duration: number = 2000) {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

            setCount(Math.floor(progress * end));

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    }, [isVisible, end, duration]);

    return { count, elementRef };
}

function StatItem({ stat }: { stat: Stat }) {
    const statNumber = stat.acf?.stat_number || 0;
    const statDescription = stat.acf?.stat_description || '';

    const { count, elementRef } = useCountUp(statNumber);

    const showPercent = statDescription.toLowerCase().includes('rate');
    const showPlus = statDescription.toLowerCase().includes('years') ||
        statDescription.toLowerCase().includes('clients');

    return (
        <div ref={elementRef} className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {count}
                {showPercent && '%'}
                {showPlus && '+'}
            </div>
            <div className="text-lg text-white opacity-90">
                {statDescription}
            </div>
        </div>
    );
}

export default function StatsSection({ stats }: StatsSectionProps) {
    if (!stats || stats.length === 0) {
        return null;
    }

    const validStats = stats.filter(stat =>
        stat.acf?.stat_number !== undefined
    );

    if (validStats.length === 0) {
        return null;
    }

    return (
        <section className="py-16 md:py-24 bg-brand-navy text-white">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Our Track Record
                    </h2>
                    <p className="text-lg opacity-90">
                        Trusted by thousands of clients across Canada
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {validStats.map((stat) => (
                        <StatItem key={stat.id} stat={stat} />
                    ))}
                </div>
            </div>
        </section>
    );
}