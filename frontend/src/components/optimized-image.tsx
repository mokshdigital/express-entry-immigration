import Image from 'next/image';

interface OptimizedImageProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    priority?: boolean;
    className?: string;
}

export function OptimizedImage({
    src,
    alt,
    width,
    height,
    priority = false,
    className = '',
}: OptimizedImageProps) {
    return (
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            quality={75}
            className={className}
            style={{ maxWidth: '100%', height: 'auto' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
    );
}