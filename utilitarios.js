function recuperarTexto(idComponente) {
    let componente;
    let valorIngresado;
    componente = document.getElementById(idComponente);
    valorIngresado = componente.value;
    return valorIngresado;
}

function recuperarInt(idComponente) {
    let valorCaja = recuperarTexto(idComponente);
    let valorEntero = parseInt(valorCaja);
    return valorEntero;
}
function recuperarFloat(idComponente) {
    let valorCaja = recuperarTexto(idComponente);
    let valorFlotante = parseFloat(valorCaja);
    return valorFlotante;
}
function mostrarTexto(idComponente, mensaje) {
    let componente;
    componente = document.getElementById(idComponente);
    componente.innerText = mensaje;
}
function mostrarTextoEnCaja(idComponente, mensaje) {
    let componente;
    componente = document.getElementById(idComponente);
    componente.value = mensaje;
}

function mostrarImagen(idComponente, rutaImagen) {
    let componente;
    componente = document.getElementById(idComponente);
    componente.src = rutaImagen;

}

// Funciones para calcular crédito

function calcularDisponible(ingresos, egresos) {
    let disponible = ingresos - egresos;
    if (disponible < 0) {
        disponible = 0;
    }
    return disponible;
}

function calcularCapacidadPago(montoDisponible) {
    let capacidadDePago = montoDisponible / 2;
    return capacidadDePago;
}

// function recuperarTexto(spn, valor) {
//     let texto = document.getElementById(spn);
//     texto.innerText = valor.toFixed(2);
// }

function recuperarTextoEntero(spn, valor) {
    let texto = document.getElementById(spn);
    texto.innerText = valor;
}

function calcularInteresSimple(monto, tasa, plazoAnios) {
    let interes = plazoAnios * monto * (tasa / 100);
    return interes;
}

// function recuperarEntero(spn) {
//     let valor = document.getElementById(spn).value;
//     return parseInt(valor);
// }

function calcularTotalPagar(monto, interes) {
    let totalAPagar = monto + interes + 100;
    return totalAPagar;
}

function calcularCuotaMensual(total, plazoAnios) {
    let cuotaMensual = total / (plazoAnios * 12);
    return cuotaMensual;
}

function aprobarCredito(capacidadPago, cuotaMensual) {
    if (capacidadPago > cuotaMensual) {
        return true;
    } else {
        return false;
    }
}

function eliminarCaja(spn) {
    let caja = document.getElementById(spn);
    caja.value = "";
}

function eliminarTexto(spn) {
    let texto = document.getElementById(spn);
    texto.innerText = "";
}

function mostrarError(idError, mensaje) {
    let error = document.getElementById(idError);
    error.innerText = mensaje;
}

function limpiarErrores() {
    eliminarTexto("errorIngresos");
    eliminarTexto("errorArriendo");
    eliminarTexto("errorAlimentacion");
    eliminarTexto("errorVarios");
    eliminarTexto("errorMonto");
    eliminarTexto("errorPlazo");
    eliminarTexto("errorTasa");
}