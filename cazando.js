// CANVAS
const canvas = document.getElementById("areaJuego");
const ctx = canvas.getContext("2d");

// CARGA DE IMÁGENES (Parte 2)
const imagenGato = new Image();
imagenGato.src = 'gato.png'; 

const imagenRaton = new Image();
imagenRaton.src = 'raton.png'; 

// Asegurar que las imágenes carguen antes de iniciar
let imagenesCargadas = 0;
function verificarCarga() {
    imagenesCargadas++;
    if (imagenesCargadas === 2) {
        iniciarJuego();
    }
}
imagenGato.onload = verificarCarga;
imagenRaton.onload = verificarCarga;

// POSICIONES
let gatoX = 0;
let gatoY = 0;
let comidaX = 0;
let comidaY = 0;

// TAMAÑOS
const ANCHO_GATO = 50;
const ALTO_GATO = 50;
const ANCHO_COMIDA = 30; // Ajustado para la imagen del ratón
const ALTO_COMIDA = 30;

// PUNTAJE Y TIEMPO (Parte 1)
let puntaje = 0;
let tiempo = 15; // Tarea 1: Límite de 15 segundos [cite: 23]
let limiteTiempoActual = 15; // Para manejar la dificultad progresiva
let intervalo;

// DIBUJAR GATO (Parte 2: Imagen PNG) [cite: 48]
function graficarGato() {
    ctx.drawImage(imagenGato, gatoX, gatoY, ANCHO_GATO, ALTO_GATO);
}

// DIBUJAR COMIDA (Parte 2: Imagen del ratón) [cite: 64]
function graficarComida() {
    ctx.drawImage(imagenRaton, comidaX, comidaY, ANCHO_COMIDA, ALTO_COMIDA);
}

// INICIAR JUEGO
function iniciarJuego() {
    // Posiciones iniciales
    gatoX = 50;
    gatoY = 50;
    comidaX = canvas.width - 100;
    comidaY = canvas.height - 100;

    // Reset valores
    puntaje = 0;
    limiteTiempoActual = 15; 
    tiempo = limiteTiempoActual;

    document.getElementById("puntaje").textContent = puntaje;
    document.getElementById("tiempo").textContent = tiempo;

    // Iniciar cronómetro
    clearInterval(intervalo);
    intervalo = setInterval(restarTiempo, 1000);

    actualizarPantalla();
}

// LIMPIAR CANVAS
function limpiarCanva() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// ACTUALIZAR PANTALLA
function actualizarPantalla() {
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();
}

// MOVIMIENTOS
function moverIzquierda() { gatoX -= 15; limitarMovimiento(); actualizarPantalla(); }
function moverDerecha() { gatoX += 15; limitarMovimiento(); actualizarPantalla(); }
function moverArriba() { gatoY -= 15; limitarMovimiento(); actualizarPantalla(); }
function moverAbajo() { gatoY += 15; limitarMovimiento(); actualizarPantalla(); }

function limitarMovimiento() {
    if (gatoX < 0) gatoX = 0;
    if (gatoX > canvas.width - ANCHO_GATO) gatoX = canvas.width - ANCHO_GATO;
    if (gatoY < 0) gatoY = 0;
    if (gatoY > canvas.height - ALTO_GATO) gatoY = canvas.height - ALTO_GATO;
}

// DETECTAR COLISIÓN (Tareas 2 y 3) [cite: 27, 34]
function detectarColision() {
    if (
        gatoX < comidaX + ANCHO_COMIDA &&
        gatoX + ANCHO_GATO > comidaX &&
        gatoY < comidaY + ALTO_COMIDA &&
        gatoY + ALTO_GATO > comidaY
    ) {
        puntaje++;
        document.getElementById("puntaje").textContent = puntaje;

        // Tarea 3: Reducción progresiva de dificultad [cite: 34]
        if (limiteTiempoActual > 2) { 
            limiteTiempoActual--; 
        }
        
        // Tarea 2: Reinicio de tiempo al nuevo valor límite [cite: 27]
        tiempo = limiteTiempoActual; 
        document.getElementById("tiempo").textContent = tiempo;

        // Nueva posición aleatoria
        comidaX = Math.random() * (canvas.width - ANCHO_COMIDA);
        comidaY = Math.random() * (canvas.height - ALTO_COMIDA);
    }
}

// TIEMPO
function restarTiempo() {
    tiempo--;
    document.getElementById("tiempo").textContent = tiempo;

    if (tiempo <= 0) {
        alert("¡Game Over! Puntuación final: " + puntaje);
        reiniciarJuego();
    }
}

function reiniciarJuego() {
    iniciarJuego();
}