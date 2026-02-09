export type MediaType = 'movie' | 'tv';

export interface Media {
    id: number;
    media_type: MediaType;

    title: string;
    overview: string;

    poster_path: string | null;
    backdrop_path: string | null;

    vote_average: number;
    date?: string;
}
