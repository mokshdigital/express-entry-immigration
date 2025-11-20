'use client';

import { useEffect, useState } from 'react';
import { useMotionValue, useTransform, animate } from 'framer-motion';

interface CountUpNumberProps {
    value: number;
    duration?: number;
    prefix?: string;
    suffix?: string;
    className?: string;
    isVisible?: boolean;
}

export function CountUpNumber({
    value,
    duration = 2,
    prefix = '',
    suffix = '',
    className = '',
    isVisible = true,
}: CountUpNumberProps) {
    const [displayValue, setDisplayValue] = useState(0);
    const count = useMotionValue(0);
    const rounded = useTransform(count, latest => Math.round(latest));

    useEffect(() => {
        if (!isVisible) return;

        count.set(0);
        const controls = animate(count, value, {
            duration,
            ease: 'easeOut',
        });

        return () => controls.stop();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, duration, isVisible]); // count is intentionally excluded

    useEffect(() => {
        const unsubscribe = rounded.on('change', latest => {
            setDisplayValue(latest);
        });

        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // rounded is intentionally excluded - it's a stable MotionValue

    return (
        <span className={className}>
            {prefix}
            {displayValue}
            {suffix}
        </span>
    );
}