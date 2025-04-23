
 // Sorting function for movie and person cards
export function sortContent(sortOption) {
    const content = document.getElementById('content');
    if (!content) return;
    const items = Array.from(content.children);
    if (items.length === 0) return;

    const isMovieCard = items[0].classList.contains('movie-card');

    items.sort((a, b) => {
        if (isMovieCard) {
            return sortMovieCards(a, b, sortOption);
        } else {
            return sortPersonCards(a, b, sortOption);
        }
    });

    items.forEach(item => content.appendChild(item));
}

/// Sorteringsfunktioner för filmer och personer
/// Sorterar filmer och personer baserat på valt alternativ
function sortMovieCards(a, b, sortOption) {
    const getTitle = element => {
        const titleElement = element.querySelector('.movie-title');
        return titleElement ? titleElement.textContent.toLowerCase() : '';
    };
    const getScore = element => {
        const scoreElement = element.querySelector('.movie-rating');
        return scoreElement ? parseFloat(scoreElement.textContent.split(' ')[1] || 0) : 0;
    };
    const getPopularity = element => {
        const popularityElement = element.querySelector('.movie-popularity');
        return popularityElement ? parseFloat(popularityElement.textContent.split(' ')[1]) || 0 : 0;
    };

    switch (sortOption) {
        case 'title-asc':
            return getTitle(a).localeCompare(getTitle(b));
        case 'title-desc':
            return getTitle(b).localeCompare(getTitle(a));
        case 'score-asc':
            return getScore(a) - getScore(b);
        case 'score-desc':
            return getScore(b) - getScore(a);
        case 'popularity-asc':
            return getPopularity(a) - getPopularity(b);
        case 'popularity-desc':
            return getPopularity(b) - getPopularity(a);
        default:
            return 0;
    }
}

// Skapa kort för personer
function sortPersonCards(a, b, sortOption) {
    const getName = element => {
        const nameElement = element.querySelector('.person-name');
        return nameElement ? nameElement.textContent.toLowerCase() : '';
    };
    const getPopularity = element => {
        const popularityElement = element.querySelector('.person-popularity');
        return popularityElement ? parseFloat(popularityElement.textContent.split(' ')[1]) || 0 : 0;
    };

    // Sorteringsalternativ för personer
    switch (sortOption) {
        case 'title-asc':
            return getName(a).localeCompare(getName(b));
        case 'title-desc':
            return getName(b).localeCompare(getName(a));
        case 'popularity-asc':
            return getPopularity(a) - getPopularity(b);
        case 'popularity-desc':
            return getPopularity(b) - getPopularity(a);
        default:
            return 0;
    }
}