import { getPopularMovies, getPosterUrl, getProfileUrl, getTopRatedMovies } from './api.js';

// Importera sorteringsfunktioner
export function displayTopRatedMovies(movies) {
    const content = document.getElementById('content');
    content.innerHTML = '';
    const top10Movies = movies.results.slice(0, 10);
    top10Movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        content.appendChild(movieCard);
    });
    showSortControls();
}

/// Visa de 10 mest populära filmerna
export function displayPopularMovies(movies) {
    const content = document.getElementById('content');
    content.innerHTML = '';
    const top10Movies = movies.results.slice(0, 10);
    top10Movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        content.appendChild(movieCard);
    });
    showSortControls();
    
}

/// Visa sökresultat för filmer
export function displayMovieSearchResults(movies) {
    const content = document.getElementById('content');
    content.innerHTML = '';
    if (movies.results.length === 0) {
        displayErrorMessage('Inga filmer hittades. Försök med en annan sökterm.');
        return;
    }
    movies.results.forEach(movie => {
        const movieCard = createMovieCard(movie);
        content.appendChild(movieCard);
    });
    showSortControls();
}

/// Visa sökresultat för personer
export function displayPersonSearchResults(people) {
    const content = document.getElementById('content');
    content.innerHTML = '';
    if (people.results.length === 0) {
        displayErrorMessage('Ingen person hittades.');
        return;
    }
    people.results.forEach(person => {
        const personCard = createPersonCard(person);
        content.appendChild(personCard);
    });
    showSortControls();
}

/// Visa felmeddelande
export function displayErrorMessage(message) {
    const content = document.getElementById('content');
    content.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-triangle"></i>
            <p>${message}</p>
        </div>
    `;
    hideSortControls();
}

// Skapa kort för filmer
function createMovieCard(movie) {
    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card';

    const posterUrl = movie.poster_path ? getPosterUrl(movie.poster_path) : 'https://via.placeholder.com/500x750?text=No+Poster';
    const title = movie.title || 'Okänd titel';
    const releaseDate = movie.release_date || 'Okänt datum';
    const overview = movie.overview || 'Ingen beskrivning tillgänglig.';
    const popularity = movie.popularity ? movie.popularity.toFixed(1) : '0';
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : '0';

    movieCard.innerHTML = `
        <img src="${posterUrl}" alt="${title}" class="movie-poster" loading="lazy">
        <div class="movie-info">
            <h3 class="movie-title">${title}</h3>
            <p class="movie-release-date">Utgivningsdatum: ${releaseDate}</p>
            <p class="movie-overview">${overview}</p>
            <div class="movie-details">
                <span class="movie-popularity">Popularitet: ${popularity}</span>
                <span class="movie-rating">Betyg: ${rating}</span>
            </div>
        </div>
    `;
    return movieCard;
}

// Skapa kort för skådespelare
function createPersonCard(person) {
    const personCard = document.createElement('div');
    personCard.className = 'person-card';

    const profileUrl = person.profile_path ? getProfileUrl(person.profile_path) : 'https://via.placeholder.com/500x750?text=No+Image';
    const name = person.name || 'Okänt namn';
    const popularity = person.popularity ? person.popularity.toFixed(1) : '0';

        // Skapa lista över "känd för" filmer/serier
        // Om personen är känd för filmer/serier, skapa en lista
        let knownForHTML = '';
        if (person.known_for && person.known_for.length > 0) {
           const knownForItems = person.known_for.slice(0, 5); // Visa max 3 kända filmer/serier
            knownForHTML = `
                <div class="known-for-container">
                    <h4>Känd för:</h4>
                    <ul class="known-for-list">
                        ${person.known_for.map(item => {
                            const title = item.title || item.name || 'Okänd titel';
                            const mediaType = item.media_type === 'tv' ? 'TV-serie' : 'Film';
                            return `<li><span class="media-type-tag">${mediaType}</span> ${title}</li>`;
                        }).join('')}
                    </ul>
                </div>
            `;
        }

    personCard.innerHTML = `
        <img src="${profileUrl}" alt="${name}" class="person-image" loading="lazy">
        <div class="person-info">
            <h3 class="person-name">${name}</h3>
            <span class="person-popularity">Popularitet: ${popularity}</span>
            ${knownForHTML}
        </div>
    `;
    return personCard;
}

// Visa sorteringskontroller
function showSortControls() {
    document.getElementById('sort-controls').classList.remove('hidden');
}
function hideSortControls() {
    document.getElementById('sort-controls').classList.add('hidden');
}