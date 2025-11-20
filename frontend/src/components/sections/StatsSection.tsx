'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CountUpNumber } from '@/components/animations/CountUpNumber';
import { AnimatedSection } from '@/components/animations/AnimatedSection';
import type { Stat } from '@/types/wordpress';

interface StatsSectionProps {
    stats: Stat[];
}

export function StatsSection({ stats }: StatsSectionProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatedSection className="py-16 md:py-24 bg-gradient-to-r from-brand-navy to-brand-navy/80">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="text-center text-white"
                        >
                            <motion.div
                                className="text-4xl md:text-5xl font-bold mb-2"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                                viewport={{ once: true }}
                            >
                                <CountUpNumber
                                    value={stat.acf?.stat_number || 0}
                                    duration={2}
                                    suffix="+"
                                    isVisible={isVisible}
                                />
                            </motion.div>
                            <p className="text-lg text-blue-100">
                                {stat.acf?.stat_description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
}