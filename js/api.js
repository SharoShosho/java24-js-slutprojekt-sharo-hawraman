const API_KEY = 'ec392a20b54ce90a45b557b2c97f91ba';
const BASE_URL = 'https://api.themoviedb.org/3';

// Hämtar filmer från API:et
// Använder async/await för att hantera asynkrona anrop
async function fetchFromAPI(endpoint, params = {}) {
    const url = new URL(`${BASE_URL}${endpoint}`);
    params.api_key = API_KEY;
    params.language = 'sv-SE';
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    const response = await fetch(url);
    if (!response.ok) throw new Error('API error');
    return await response.json();
}


export async function getTopRatedMovies() {
    return await fetchFromAPI('/movie/top_rated');
}


export async function getPopularMovies() {
    return await fetchFromAPI('/movie/popular');
}

export async function searchMovies(query) {
    return await fetchFromAPI('/search/movie', { query });
}

export async function searchPeople(query) {
    return await fetchFromAPI('/search/person', { query });
}

export function getPosterUrl(posterPath, size = 'w500') {
    return posterPath
        ? `https://image.tmdb.org/t/p/${size}${posterPath}`
        : 'https://via.placeholder.com/500x750?text=No+Poster';
}

export function getProfileUrl(profilePath, size = 'w500') {
    return profilePath
        ? `https://image.tmdb.org/t/p/${size}${profilePath}`
        : 'https://via.placeholder.com/500x750?text=No+Image';
}