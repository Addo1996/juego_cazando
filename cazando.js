// CANVAS
const canvas = document.getElementById("areaJuego");
const ctx = canvas.getContext("2d");

// POSICIONES
let gatoX = 0;
let gatoY = 0;
let comidaX = 0;
let comidaY = 0;

// TAMAÑOS
const ANCHO_GATO = 50;
const ALTO_GATO = 50;
const ANCHO_COMIDA = 20;
const ALTO_COMIDA = 20;

// PUNTAJE Y TIEMPO
let puntaje = 0;
let tiempo = 120;
let intervalo;

// DIBUJAR RECTÁNGULO
function graficarRectangulo(x, y, ancho, alto, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, ancho, alto);
}

// DIBUJAR GATO
function graficarGato() {
    graficarRectangulo(gatoX, gatoY, ANCHO_GATO, ALTO_GATO, "#772080");
}

// DIBUJAR COMIDA
function graficarComida() {
    graficarRectangulo(comidaX, comidaY, ANCHO_COMIDA, ALTO_COMIDA, "red");
}

// INICIAR JUEGO
function iniciarJuego() {
    // posiciones iniciales
    gatoX = (0) + (ANCHO_GATO);
    gatoY = (0) + (ALTO_GATO);

    comidaX = canvas.width - ANCHO_COMIDA;
    comidaY = canvas.height - ALTO_COMIDA;

    // reset valores
    puntaje = 0;
    tiempo = 120;

    document.getElementById("puntaje").textContent = puntaje;
    document.getElementById("tiempo").textContent = tiempo;

    // iniciar tiempo
    clearInterval(intervalo);
    intervalo = setInterval(restarTiempo, 1000);

    // dibujar
    limpiarCanva();
    graficarGato();
    graficarComida();
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
function moverIzquierda() {
    gatoX -= 10;
    limitarMovimiento();
    actualizarPantalla();
}

function moverDerecha() {
    gatoX += 10;
    limitarMovimiento();
    actualizarPantalla();
}

function moverArriba() {
    gatoY -= 10;
    limitarMovimiento();
    actualizarPantalla();
}

function moverAbajo() {
    gatoY += 10;
    limitarMovimiento();
    actualizarPantalla();
}

// EVITAR QUE SALGA DEL CANVAS
function limitarMovimiento() {
    if (gatoX < 0) gatoX = 0;
    if (gatoX > canvas.width - ANCHO_GATO) gatoX = canvas.width - ANCHO_GATO;
    if (gatoY < 0) gatoY = 0;
    if (gatoY > canvas.height - ALTO_GATO) gatoY = canvas.height - ALTO_GATO;
}

// DETECTAR COLISIÓN
function detectarColision() {
    if (
        gatoX < comidaX + ANCHO_COMIDA &&
        gatoX + ANCHO_GATO > comidaX &&
        gatoY < comidaY + ALTO_COMIDA &&
        gatoY + ALTO_GATO > comidaY
    ) {
        // sumar puntos
        puntaje++;
        document.getElementById("puntaje").textContent = puntaje;

        // nueva posición aleatoria
        comidaX = Math.random() * (canvas.width - ANCHO_COMIDA);
        comidaY = Math.random() * (canvas.height - ALTO_COMIDA);
    }
}

// TIEMPO
function restarTiempo() {
    tiempo--;
    document.getElementById("tiempo").textContent = tiempo;

    if (puntaje >= 6) {
        alert("¡Ganaste!");
        clearInterval(intervalo);
    }

    if (tiempo <= 0) {
        alert("Game Over");
        clearInterval(intervalo);
    }
}

// REINICIAR JUEGO
function reiniciarJuego() {
    iniciarJuego();
}