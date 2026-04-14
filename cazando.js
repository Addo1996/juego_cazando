// 7. Obtener el canvas y su contexto [cite: 31]
const canvas = document.getElementById("areaJuego");
const ctx = canvas.getContext("2d");

// 16. Definir variables de posición (inicializadas en 0) cite: 44, 45, 46
let gatoX = 0;
let gatoY = 0;
let comidaX = 0;
let comidaY = 0;

// 16. Definir constantes de tamaño [cite: 47, 48, 49, 50, 51]
const ANCHO_GATO = 50;
const ALTO_GATO = 50;
const ANCHO_COMIDA = 20;
const ALTO_COMIDA = 20;

// 20. Función genérica para graficar rectángulos [cite: 59, 60]
function graficarRectangulo(x, y, ancho, alto, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, ancho, alto);
}

// 8 y 21. Función para dibujar al gato usando la función genérica [cite: 32, 61]
function graficarGato() {
    graficarRectangulo(gatoX, gatoY, ANCHO_GATO, ALTO_GATO, "blue");
}

// 12 y 21. Función para dibujar la comida usando la función genérica [cite: 36, 61]
function graficarComida() {
    graficarRectangulo(comidaX, comidaY, ANCHO_COMIDA, ALTO_COMIDA, "red");
}

// 13. Función principal para iniciar el juego [cite: 41]
function iniciarJuego() {
    // 17. Asignar valores para posicionar elementos [cite: 53]
    
    // El gato aparece centrado [cite: 55]
    gatoX = (canvas.width / 2) - (ANCHO_GATO / 2);
    gatoY = (canvas.height / 2) - (ALTO_GATO / 2);

    // La comida aparece en la esquina inferior derecha [cite: 56]
    comidaX = canvas.width - ANCHO_COMIDA;
    comidaY = canvas.height - ALTO_COMIDA;

    // Dibujar los elementos [cite: 43]
    graficarGato();
    graficarComida();
}

// 1. Crear la función limpiarCanva [cite: 83]
function limpiarCanva() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// 2. Funciones de movimiento [cite: 84, 91]
function moverIzquierda() {
    gatoX -= 10; // Restar 10 a la posición X [cite: 85]
    actualizarPantalla();
}

function moverDerecha() {
    gatoX += 10; // Sumar 10 a la posición X [cite: 92]
    actualizarPantalla();
}

function moverArriba() {
    gatoY -= 10; // Restar 10 a la posición Y [cite: 93]
    actualizarPantalla();
}

function moverAbajo() {
    gatoY += 10; // Sumar 10 a la posición Y [cite: 94]
    actualizarPantalla();
}

// Función auxiliar para refrescar el canvas tras cada movimiento [cite: 86, 87]
function actualizarPantalla() {
    limpiarCanva();
    graficarGato();
    graficarComida(); // La comida debe volver a dibujarse porque limpiarCanva borra todo [cite: 87]
}