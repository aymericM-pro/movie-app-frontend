const TMDB_BASE = 'https://image.tmdb.org/t/p';

export type ImageSize =
    | 'w92'
    | 'w185'
    | 'w154'
    | 'w342'
    | 'w500'
    | 'w780'
    | 'w1280'
    | 'original';

const FALLBACKS = {
    poster: '/images/placeholder-poster.jpg',
    backdrop: '/images/placeholder-backdrop.jpg',
};

export function getPosterUrl(
    path?: string | null,
    size: ImageSize = 'w342',
): string {
    if (!path) return FALLBACKS.poster;
    return `${TMDB_BASE}/${size}${normalize(path)}`;
}

export function getBackdropUrl(
    path?: string | null,
    size: ImageSize = 'w1280',
): string {
    if (!path) return FALLBACKS.backdrop;
    return `${TMDB_BASE}/${size}${normalize(path)}`;
}

function normalize(path: string): string {
    return path.startsWith('/') ? path : `/${path}`;
}

export function getHeroImageUrl(
    posterPath?: string | null,
    backdropPath?: string | null,
    size: ImageSize = 'w1280',
): string {
    if (backdropPath) {
        return `${TMDB_BASE}/${size}${normalize(backdropPath)}`;
    }

    if (posterPath) {
        return `${TMDB_BASE}/${size}${normalize(posterPath)}`;
    }

    return 'https://placehold.co/1600x900?text=No+Image';
}
