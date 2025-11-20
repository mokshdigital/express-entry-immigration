import { Variants } from 'framer-motion';

// Fade In animations
export const fadeIn: Variants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: { duration: 0.6 }
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.6 }
    },
};

export const fadeInUp: Variants = {
    initial: { opacity: 0, y: 30 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 }
    },
    exit: {
        opacity: 0,
        y: 30,
        transition: { duration: 0.6 }
    },
};

export const fadeInDown: Variants = {
    initial: { opacity: 0, y: -30 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 }
    },
    exit: {
        opacity: 0,
        y: -30,
        transition: { duration: 0.6 }
    },
};

export const fadeInLeft: Variants = {
    initial: { opacity: 0, x: -30 },
    animate: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6 }
    },
    exit: {
        opacity: 0,
        x: -30,
        transition: { duration: 0.6 }
    },
};

export const fadeInRight: Variants = {
    initial: { opacity: 0, x: 30 },
    animate: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6 }
    },
    exit: {
        opacity: 0,
        x: 30,
        transition: { duration: 0.6 }
    },
};

// Scale animations
export const scaleIn: Variants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6 }
    },
    exit: {
        opacity: 0,
        scale: 0.9,
        transition: { duration: 0.6 }
    },
};

// Stagger container for animations
export const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

export const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

// Parallax effect helper (use with scroll)
export const parallaxVariants = (offset: number): Variants => ({
    initial: { y: 0 },
    animate: {
        y: offset,
        transition: { duration: 0.6 }
    },
});