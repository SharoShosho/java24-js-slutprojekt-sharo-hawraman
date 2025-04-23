import { getTopRatedMovies, getPopularMovies, searchMovies, searchPeople } from './api.js';
import { displayTopRatedMovies, displayPopularMovies, displayMovieSearchResults, displayPersonSearchResults, displayErrorMessage } from './display.js';
import { sortContent } from './sorting.js';

/// Visa sorteringsalternativ
document.getElementById('top-rated-btn').addEventListener('click', handleTopRatedClick);
document.getElementById('popular-btn').addEventListener('click', handlePopularClick);
document.getElementById('search-form').addEventListener('submit', handleSearchSubmit);
document.getElementById('search-input').addEventListener('input', (e) => {
    if (e.target.value.trim() === '') {
        document.getElementById('content').innerHTML = '';
    }
});
/// Lyssna på radioknappar för att ändra söktyp
document.querySelectorAll('input[name="search-type"]').forEach((radio) => {
    radio.addEventListener('change', (e) => {
        const searchType = e.target.value;
        const searchInput = document.getElementById('search-input');
        searchInput.placeholder = searchType === 'movie' ? 'Sök filmer...' : 'Sök personer...';
    });
});
/// Lyssna på sorteringsalternativ
document.getElementById('sort-select').addEventListener('change', (e) => {
    const sortOption = e.target.value;
    sortContent(sortOption);
});

/// Visa sorteringsalternativ
async function handleTopRatedClick(e) {
    e.preventDefault();
    try {
        const movies = await getTopRatedMovies();
        displayTopRatedMovies(movies);
    } catch (error) {
        console.error('Error fetching top rated movies:', error);
        displayErrorMessage('Ett fel uppstod vid hämtning av topprankade filmer. Försök igen senare.');
    }
}

/// Visa de 10 mest populära filmerna
/// och sorteringsalternativ
async function handlePopularClick(e) {
    e.preventDefault();
    try {
        const movies = await getPopularMovies();
        displayPopularMovies(movies);
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        displayErrorMessage('Ett fel uppstod vid hämtning av populära filmer. Försök igen senare.');
    }
}

/// Hantera sökformulärens inlämning
async function handleSearchSubmit(e) {
    e.preventDefault();
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value.trim();
    if (!query) {
        displayErrorMessage('Vänligen ange en sökterm.');
        return;
    }
    
    // Hämta den valda söktypen (film eller person)
    const searchType = document.querySelector('input[name="search-type"]:checked').value;
    try {
        if (searchType === 'movie') {
            const movies = await searchMovies(query);
            if (movies.results.length === 0) {
                displayErrorMessage('Inga filmer hittades. Försök med en annan sökterm.');
            } else {
                displayMovieSearchResults(movies);
            }
        } else if (searchType === 'person') {
            const people = await searchPeople(query);
            displayPersonSearchResults(people);
        }
    } catch (error) {
        console.error('Error searching:', error);
        displayErrorMessage('Ett fel uppstod vid sökningen. Försök igen senare.');
    }
}