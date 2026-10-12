//Miranda Stohmann Mateo Sebastian

const API_KEY = 'add4b9fdfe17054610f47281bc42ec14'; 
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const seriesGrid    = document.getElementById('series-grid');
const loadingDiv    = document.getElementById('loading');
const errorDiv      = document.getElementById('error');
const errorMessage  = document.getElementById('error-message');
const resultsTitle  = document.getElementById('results-title');
const resultsCount  = document.getElementById('results-count');
const searchInput   = document.getElementById('search');
const clearBtn      = document.getElementById('clear-search');
const retryBtn      = document.getElementById('retry-btn');
const themeToggle   = document.getElementById('theme-toggle');
const modal         = document.getElementById('serie-modal');
const modalBody     = document.getElementById('modal-body');
const modalClose    = document.getElementById('modal-close');
const modalOverlay  = document.getElementById('modal-overlay');


// ============================================================================
// UTILIDADES DE UI (DADO - no modificar)
// ============================================================================
const mostrarLoading = () => {
    loadingDiv.style.display = 'flex';
    errorDiv.style.display = 'none';
    seriesGrid.innerHTML = '';
};

const ocultarLoading = () => {
    loadingDiv.style.display = 'none';
};

const mostrarError = (mensaje) => {
    ocultarLoading();
    errorMessage.textContent = mensaje;
    errorDiv.style.display = 'flex';
    seriesGrid.innerHTML = '';
};


// ============================================================================
// DARK MODE (DADO - no modificar)
// ============================================================================
const aplicarTema = (tema) => {
    document.documentElement.setAttribute('data-theme', tema);
    themeToggle.textContent = tema === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', tema);
};

const cargarTema = () => {
    const guardado = localStorage.getItem('theme');
    const preferido = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    aplicarTema(guardado || preferido);
};

themeToggle.addEventListener('click', () => {
    const actual = document.documentElement.getAttribute('data-theme');
    aplicarTema(actual === 'dark' ? 'light' : 'dark');
});

cargarTema();


const renderizarSeries = (serie) => {
    seriesGrid.innerHTML = '';

    serie.forEach((serie) => {
        const card = document.createElement('div');
        card.classList.add('serie-card');

        const año = serie.first_air_date ? new Date(serie.first_air_date).getFullYear() : 'N/A';

        const imagenSrc = serie.poster_path
            ? `${IMAGE_URL}${serie.poster_path}`
            : 'https://via.placeholder.com/500x750?text=No+Image';

        card.innerHTML = `
        <div class="serie-card__content">
            <h3 class="serie-card__title">${serie.name}</h3>
        </div>
        <div class="serie-card__poster">
            <img class="serie-card__image" src="${imagenSrc}" alt="${serie.name}">
            <span class="serie-card__rating">⭐ ${serie.vote_average.toFixed(1)}</span>
        </div>
        <div class="serie-card__content">
            <h3 class="serie-card__title">${serie.name}</h3>
            <p class="serie-card__year">${año}</p>
        </div>
        `;
        seriesGrid.appendChild(card);
    });
}; 

const obtenerSeriesPopulares = async () => {
    mostrarLoading();

    const respuesta = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=es-ES`);
    const datos = await respuesta.json();

    renderizarSeries(datos.results);
    ocultarLoading();
};

document.addEventListener('DOMContentLoaded', obtenerSeriesPopulares);