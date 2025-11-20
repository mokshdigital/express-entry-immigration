/**
 * API Error Handling
 */

export class WordPressAPIError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = 'WordPressAPIError';
        this.status = status;
    }
}

export function handleAPIError(error: unknown): never {
    if (error instanceof WordPressAPIError) {
        throw error;
    }

    if (error instanceof Error) {
        throw new WordPressAPIError(error.message, 500);
    }

    throw new WordPressAPIError('An unexpected error occurred', 500);
}