// Elementos principales del carrusel
const imagenesCarrusel = document.querySelectorAll(".diapositiva-carrusel");
const indicadoresCarrusel = document.querySelectorAll(".indicador-carrusel");
const botonAnterior = document.getElementById("boton-anterior");
const botonSiguiente = document.getElementById("boton-siguiente");
const imagenesExternas = document.querySelectorAll("img[data-respaldo]");

let indiceImagenActual = 0;
let temporizadorCarrusel;
const tiempoCambioAutomatico = 4500;

function mostrarImagen(indiceNuevo) {
    imagenesCarrusel[indiceImagenActual].classList.remove("visible");
    indicadoresCarrusel[indiceImagenActual].classList.remove("activo");

    indiceImagenActual = (indiceNuevo + imagenesCarrusel.length) % imagenesCarrusel.length;

    imagenesCarrusel[indiceImagenActual].classList.add("visible");
    indicadoresCarrusel[indiceImagenActual].classList.add("activo");
}

function imagenSiguiente() {
    mostrarImagen(indiceImagenActual + 1);
}

function imagenAnterior() {
    mostrarImagen(indiceImagenActual - 1);
}

function iniciarCambioAutomatico() {
    temporizadorCarrusel = setInterval(imagenSiguiente, tiempoCambioAutomatico);
}

function reiniciarCambioAutomatico() {
    clearInterval(temporizadorCarrusel);
    iniciarCambioAutomatico();
}

botonSiguiente.addEventListener("click", function () {
    imagenSiguiente();
    reiniciarCambioAutomatico();
});

botonAnterior.addEventListener("click", function () {
    imagenAnterior();
    reiniciarCambioAutomatico();
});

indicadoresCarrusel.forEach(function (indicador) {
    indicador.addEventListener("click", function () {
        const posicionImagen = Number(indicador.dataset.posicion);
        mostrarImagen(posicionImagen);
        reiniciarCambioAutomatico();
    });
});

// Usa una imagen local si una imagen externa no se puede cargar
imagenesExternas.forEach(function (imagen) {
    imagen.addEventListener("error", function () {
        if (imagen.src.includes(imagen.dataset.respaldo)) {
            return;
        }

        imagen.src = imagen.dataset.respaldo;
    });
});

iniciarCambioAutomatico();
