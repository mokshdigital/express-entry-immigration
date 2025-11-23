"use client";

/**
 * Hero Section - Home page hero with background image
 */
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { HeroSettings } from '@/types/wordpress';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
    settings: HeroSettings;
}

export default function Hero({ settings }: HeroProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    return (
        <section ref={ref} className="relative h-[600px] md:h-[700px] flex items-center overflow-hidden">
            {/* Background Image */}
            <motion.div
                style={{ y }}
                className="absolute inset-0 z-0"
            >
                <Image
                    src={settings.hero_background_image}
                    alt="Hero background"
                    fill
                    className="object-cover"
                    priority
                    quality={90}
                />
                {/* Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            </motion.div>

            {/* Content */}
            <div className="container relative z-10">
                <div className="max-w-2xl text-white">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                        {settings.hero_headline}
                    </h1>
                    <p className="text-lg md:text-xl mb-8 leading-relaxed opacity-95">
                        {settings.hero_subtext}
                    </p>
                    <Button
                        asChild
                        size="lg"
                        className="bg-brand-red hover:bg-brand-red/90 text-white font-semibold px-8 py-6 text-lg transition-all duration-300 hover:scale-105"
                    >
                        <Link href="/contact">
                            {settings.hero_cta_text}
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}