'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ReactNode } from 'react';

interface FlipCardProps {
    front: ReactNode;
    back: ReactNode;
    className?: string;
}

export function FlipCard({ front, back, className = '' }: FlipCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <motion.div
            className={`relative w-full h-full cursor-pointer perspective ${className}`}
            onClick={() => setIsFlipped(!isFlipped)}
            onHoverStart={() => setIsFlipped(true)}
            onHoverEnd={() => setIsFlipped(false)}
        >
            <motion.div
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="w-full h-full"
            >
                {/* Front */}
                <motion.div
                    style={{ backfaceVisibility: 'hidden' }}
                    className="absolute w-full h-full"
                >
                    {front}
                </motion.div>

                {/* Back */}
                <motion.div
                    initial={{ rotateY: 180 }}
                    animate={{ rotateY: isFlipped ? 0 : 180 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                    }}
                    className="absolute w-full h-full"
                >
                    {back}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}