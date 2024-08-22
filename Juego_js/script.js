// Variables globales
let timerInterval;
let time = 0;
let aciertos = 0;
let desaciertos = 0;

// Elementos del DOM
const timerElement = document.getElementById('timer');
const aciertosElement = document.getElementById('aciertos');
const desaciertosElement = document.getElementById('desaciertos');
const restartButton = document.getElementById('restart');
const closeButton = document.getElementById('close');
const letterElements = document.querySelectorAll('td.letter');

// Palabras ocultas en la sopa de letras
const palabras = ["ABC", "GHI"];  // Ejemplo de palabras a encontrar

// Inicia el cronómetro
function startTimer() {
    timerInterval = setInterval(() => {
        time++;
        updateTimerDisplay();
    }, 1000);
}

// Actualiza la pantalla del cronómetro
function updateTimerDisplay() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerElement.textContent = ${pad(minutes)}:${pad(seconds)};
}

// Agrega un cero a los números menores de 10
function pad(number) {
    return number < 10 ? '0' + number : number;
}

// Resalta letras seleccionadas y verifica si forman parte de una palabra
function selectLetter(event) {
    const letter = event.target;
    letter.classList.toggle('selected');

    // Aquí podrías agregar la lógica para verificar si las letras seleccionadas forman una palabra
    checkWord();
}

// Verifica si las letras seleccionadas forman una palabra
function checkWord() {
    let selectedLetters = '';
    const selectedElements = document.querySelectorAll('td.selected');

    selectedElements.forEach(letter => {
        selectedLetters += letter.textContent;
    });

    if (palabras.includes(selectedLetters)) {
        selectedElements.forEach(letter => {
            letter.classList.remove('selected');
            letter.classList.add('found');  // Marca la palabra como encontrada
        });
        aciertos++;
        aciertosElement.textContent = `Aciertos: ${aciertos}`;
    } else if (selectedLetters.length === palabras[0].length) {
        selectedElements.forEach(letter => {
            letter.classList.remove('selected');
        });
        desaciertos++;
        desaciertosElement.textContent = `Desaciertos: ${desaciertos}`;
    }
}

// Reinicia el juego
function restartGame() {
    clearInterval(timerInterval);
    time = 0;
    aciertos = 0;
    desaciertos = 0;
    updateTimerDisplay();
    aciertosElement.textContent = 'Aciertos: 0';
    desaciertosElement.textContent = 'Desaciertos: 0';

    // Limpia las selecciones y la tabla de sopa de letras
    letterElements.forEach(letter => {
        letter.classList.remove('selected', 'found');
    });

    startTimer();
}

// Cierra el juego
function closeGame() {
    clearInterval(timerInterval);
    alert('Juego cerrado');
    // Aquí podrías redirigir al usuario a otra página o cerrar la ventana
}

// Inicializa el juego
function initGame() {
    startTimer();

    // Agrega event listeners a las letras
    letterElements.forEach(letter => {
        letter.addEventListener('click', selectLetter);
    });

    // Event listeners para los botones
    restartButton.addEventListener('click', restartGame);
    closeButton.addEventListener('click', closeGame);
}

// Inicia el juego al cargar la página
window.onload = initGame;