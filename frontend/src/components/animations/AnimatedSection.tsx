'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedSectionProps {
    children: ReactNode;
    variants?: Variants;
    delay?: number;
    duration?: number;
    className?: string;
}

export function AnimatedSection({
    children,
    variants,
    delay = 0,
    duration = 0.6,
    className = '',
}: AnimatedSectionProps) {
    const defaultVariants: Variants = {
        initial: { opacity: 0, y: 30 },
        animate: {
            opacity: 1,
            y: 0,
            transition: { duration, delay }
        },
    };

    return (
        <motion.div
            initial="initial"
            whileInView="animate"
            exit="exit"
            viewport={{ once: true, margin: '-100px' }}
            variants={variants || defaultVariants}
            className={className}
        >
            {children}
        </motion.div>
    );
}