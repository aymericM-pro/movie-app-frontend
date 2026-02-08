import { Movie } from '@/types/movie.types.ts';

export interface Collection {
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    parts: CollectionPart[];
}

export interface CollectionPart {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    runtime?: number;
    revenue?: number;
    budget?: number;
}

export interface CollectionDetails extends Collection {
    parts: CollectionPartDetails[];
}

export interface CollectionPartDetails extends CollectionPart {
    runtime: number;
    revenue: number;
    budget: number;
    genres: Genre[];
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    spoken_languages: SpokenLanguage[];
}

export interface Genre {
    id: number;
    name: string;
    image?: string;
}

export interface ProductionCompany {
    id: number;
    name: string;
    logo_path: string | null;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

export interface SpokenLanguage {
    iso_639_1: string;
    name: string;
}

export interface PopularCollection {
    id: number;
    name: string;
    overview: string;
    posterPath: string | null;
    backdropPath: string | null;
    partsCount: number;
}

export interface TMDBVideo {
    id: string;
    key: string;
    site: string;
    type: string;
    name: string;
}

export interface TMDBVideosResponse {
    results: TMDBVideo[];
}

export interface TMDBImage {
    file_path: string;
    width: number;
    height: number;
}

export interface TMDBImagesResponse {
    backdrops: TMDBImage[];
    posters: TMDBImage[];
    logos?: TMDBImage[];
}

export interface TMDBMovieCredits {
    cast: Array<{
        id: number;
        name: string;
        character: string;
        profile_path: string | null;
    }>;
    crew: Array<{
        id: number;
        name: string;
        job: string;
    }>;
}

export interface TMDBVideoResponse {
    results: TMDBVideo[];
}

export interface TMDBMovieFull {
    details: TMDBMovieDetails;
    videos?: TMDBVideosResponse;
    images?: TMDBImagesResponse;
    similar?: {
        results: Movie[];
    };
}

export interface TMDBMovieDetails {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    runtime: number;
    release_date: string;
    vote_average: number;
    credits?: TMDBMovieCredits;
    budget: number;
    revenue: number;
    status: string;
    genres: Genre[];
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    spoken_languages: SpokenLanguage[];
}

export interface TMDBCollectionSearchResponse {
    results: TMDBCollectionSearchItem[];
}

export interface TMDBCollectionSearchItem {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
    overview: string;
}
