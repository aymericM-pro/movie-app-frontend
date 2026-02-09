export type TvCollectionType = 'RECENT' | 'AIRING_TODAY' | 'POPULAR';

export interface TvSearchResponse {
    page: number;
    total_pages: number;
    total_results: number;
    results: TvShow[];
}

export interface TvShow {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
    vote_average: number;
    first_air_date?: string;
}

export interface TvDetailsApiResponse {
    credits: TvCredits;
    details: TvMainDetails;
}

export interface TvDetailsApiResponse {
    credits: TvCredits;
    details: TvMainDetails;
}

export interface TvCast {
    id: number;
    name: string;
    character: string;
    order: number;
    profile_path: string | null;
}

export interface TvCrew {
    id: number;
    department: string;
    job: string;
    profile_path: string | null;
}

export interface TvCredits {
    cast: TvCast[];
    crew: TvCrew[];
}

export interface TvGenre {
    id: number;
    name: string;
}

export interface TvSeason {
    season_number: number;
    name: string;
    overview: string;
    air_date: string;
    poster_path: string | null;
    episode_count: number;
}

export interface TvMainDetails {
    id: number;
    name: string;
    original_name: string;
    overview: string;

    poster_path: string | null;
    backdrop_path: string | null;

    first_air_date: string;
    last_air_date: string;

    number_of_seasons: number;
    number_of_episodes: number;

    vote_average: number;
    vote_count: number;

    genres: TvGenre[];
    seasons: TvSeason[];
}

export interface TvVideo {
    id: string;
    key: string;
    name: string;
    site: 'YouTube' | 'Vimeo';
    type: 'Trailer' | 'Teaser' | 'Clip' | 'Featurette';
    official: boolean;
}

export interface TvVideosResponse {
    results: TvVideo[];
}

export interface TvImage {
    file_path: string;
    width: number;
    height: number;
    aspect_ratio: number;
}

export interface TvImagesResponse {
    backdrops: TvImage[];
    posters: TvImage[];
}

export interface TvDetailsApiResponse {
    details: TvMainDetails;
    credits: TvCredits;
    videos: TvVideosResponse;
    images: TvImagesResponse;
    similar: TvSearchResponse;
}
