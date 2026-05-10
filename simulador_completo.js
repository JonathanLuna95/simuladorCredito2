
let clientes = [];
let creditos = [];

let tasaInteres = 15;
let clienteSeleccionado = null;
let cuotaCalculada = 0;
let montoCalculado = 0;
let plazoCalculado = 0;
let creditoAprobado = false;


//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios

function ocultarSecciones() {
  let componente = document.getElementById("parametros");
  let listaClass = componente.classList;

  listaClass.remove("activa");

  let componente2 = document.getElementById("clientes");
  let listaClass2 = componente2.classList;

  listaClass2.remove("activa");

  let componente3 = document.getElementById("credito");
  let listaClass3 = componente3.classList;

  listaClass3.remove("activa");
}

function mostrarSeccion(id) {
  ocultarSecciones();

  let componente = document.getElementById(id);
  let listaClass = componente.classList;

  listaClass.add("activa");

}

function guardarTasa() {
  let tasa = recuperarFloat("tasaInteres");

  if (tasa >= 10 && tasa <= 20) {
    tasaInteres = tasa;
    mostrarTexto("mensajeTasa", "Tasa configurada correctamente: " + tasa + " %");

  } else {
    mostrarTexto("mensajeTasa", "La tasa debe estar entre 10 y 20");
  }
}

function guardarCliente() {
  let cedula = recuperarTexto("txtCedula");
  let nombre = recuperarTexto("txtNombre");
  let apellido = recuperarTexto("txtApellido");
  let ingresos = recuperarFloat("txtIngresos");
  let egresos = recuperarFloat("txtEgresos");

  let clienteEncontrado = buscarCliente(cedula);

  if (clienteEncontrado == null) {
    let cliente = {};
    cliente.cedula = cedula;
    cliente.nombre = nombre;
    cliente.apellido = apellido;
    cliente.ingresos = ingresos;
    cliente.egresos = egresos;

    clientes.push(cliente);
  } else {
    clienteEncontrado.nombre = nombre;
    clienteEncontrado.apellido = apellido;
    clienteEncontrado.ingresos = ingresos;
    clienteEncontrado.egresos = egresos;
  }

  pintarClientes();
  limpiar();
}

function pintarClientes() {
  let contenidoTabla = "";
  let cliente;
  for (let indice = 0; indice < clientes.length; indice++) {
    cliente = clientes[indice];

    contenidoTabla += "<tr>";
    contenidoTabla += "<td>" + cliente.cedula + "</td>";
    contenidoTabla += "<td>" + cliente.nombre + "</td>";
    contenidoTabla += "<td>" + cliente.apellido + "</td>";
    contenidoTabla += "<td>" + cliente.ingresos + "</td>";
    contenidoTabla += "<td>" + cliente.egresos + "</td>";
    contenidoTabla += "<td>";
    contenidoTabla += "<button onclick=\"seleccionarCliente('" + cliente.cedula + "')\">Actualizar</button> ";
    contenidoTabla += "<button onclick=\"eliminarCliente('" + cliente.cedula + "')\">Eliminar</button>";
    contenidoTabla += "</td>";
    contenidoTabla += "</tr>";
  }
  document.getElementById("tablaClientes").innerHTML = contenidoTabla;
}

function buscarCliente(cedula) {
  let cliente;
  for (let indice = 0; indice < clientes.length; indice++) {
    cliente = clientes[indice];

    if (cliente.cedula == cedula) {
      return cliente;
    }
  }
  return null;
}

function seleccionarCliente(cedula) {
  let clienteEncontrado = buscarCliente(cedula);

  if (clienteEncontrado != null) {
    clienteSeleccionado = clienteEncontrado;

    mostrarTextoEnCaja("txtCedula", clienteEncontrado.cedula);
    mostrarTextoEnCaja("txtNombre", clienteEncontrado.nombre);
    mostrarTextoEnCaja("txtApellido", clienteEncontrado.apellido);
    mostrarTextoEnCaja("txtIngresos", clienteEncontrado.ingresos);
    mostrarTextoEnCaja("txtEgresos", clienteEncontrado.egresos);

    document.getElementById("txtCedula").readOnly = true;
  }
}

function limpiar() {
  mostrarTextoEnCaja("txtCedula", "");
  mostrarTextoEnCaja("txtNombre", "");
  mostrarTextoEnCaja("txtApellido", "");
  mostrarTextoEnCaja("txtIngresos", "");
  mostrarTextoEnCaja("txtEgresos", "");

  document.getElementById("txtCedula").readOnly = false;
  clienteSeleccionado = null;
}

function eliminarCliente(cedula) {
  for (let indice = 0; indice < clientes.length; indice++) {
    if (clientes[indice].cedula == cedula) {
      clientes.splice(indice, 1);
      break;
    }
  }

  pintarClientes();
  limpiar();
}

function buscarClienteCredito() {
  // Paso 1: Leer la cédula del imput "buscarCedulaCredito"
  let cedula = recuperarTexto("buscarCedulaCredito");

  //Paso 2: Buscar el cliente con buscarCliente(cedula);
  let clienteEncontrado = buscarCliente(cedula);

  //Paso 3: el if/else que decide que hacer

  if (clienteEncontrado === null) {
    // Si no se encuentra el cliente, limpiamos la variable seleccionada
    clienteSeleccionado = null;

    document.getElementById("datosClienteCredito").innerHTML = "CLIENTE NO ENCONTRADO";
  } else {

    // Guardamos el cliente encontrado para usarlo luego en el cálculo del crédito
    clienteSeleccionado = clienteEncontrado;

    // Armamos dinámicamente los datos del cliente para mostrarlos en pantalla
    let datos = "<h3>Datos del Cliente</h3>"+
                "<p><strong>Cédula:</strong>" + clienteEncontrado.cedula + "</p>"+
                "<p><strong>Nombre:</strong>" + clienteEncontrado.nombre + "</p>"+
                "<p><strong>Apellido:</strong>" + clienteEncontrado.apellido + "</p>"+
                "<p><strong>Ingresos:</strong>" + clienteEncontrado.ingresos + "</p>"+
                "<p><strong>Egresos:</strong>" + clienteEncontrado.egresos + "</p>";

    // Insertamos los datos en el componente datosClienteCredito
    document.getElementById("datosClienteCredito").innerHTML = datos;
  }
}

function calcularCredito(){
  // Recuperamos el contenedor donde vamos a mostrar el resultado del crédito
  let resultadoCredito = document.getElementById("resultadoCredito");

  // Validamos que primero se haya buscado el cliente
  if (clienteSeleccionado == null){
    resultadoCredito.innerHTML = "Por favor, busque y seleccione un cliente primero.";
    resultadoCredito.className = "rechazado"
    return;
  }

  // Recuperamos el monto solicitado y el plazo ingresado
  let monto = recuperarFloat("montoCredito");
  let plazoAnios = recuperarInt("plazoCredito");

  // Validar que el monto sea un número válido y mayor a 0
  if ((isNaN(monto) || monto <= 0) && (isNaN(plazoAnios) || plazoAnios <=0)){
    resultadoCredito.innerHTML = "Ingrese un monto de crédito válido.<br>Ingrese un plazo válido.";
    resultadoCredito.className = "rechazado";
    return;

  } else if (isNaN(monto) || monto <= 0){
    resultadoCredito.innerHTML = "Ingrese un monto de crédito válido.";
    resultadoCredito.className = "rechazado";
    return;

  } else if (monto > 50000){
    resultadoCredito.innerHTML = "El monto no puede superar los 50.000";
    resultadoCredito.className = "rechazado";
    return;

  } else if (isNaN(plazoAnios) || plazoAnios <=0){
    resultadoCredito.innerHTML = "Ingrese un plazo válido.";
    resultadoCredito.className = "rechazado";
    return;

  } else if (plazoAnios > 10){
    resultadoCredito.innerHTML = "El plazo no puede superar los 10 años.";
    resultadoCredito.className = "rechazado";
    return;
  }

  // Tomamos los ingresos y egresos del cliente seleccionado
  let ingresos = parseFloat(clienteSeleccionado.ingresos);
  let egresos = parseFloat(clienteSeleccionado.egresos);

  // Calculamos el dinero disponible del cliente
  let disponible = calcularDisponible(ingresos, egresos);

  // Calcular la capacidad de pago
  let capacidadPago = calcularCapacidadPago(disponible);

  // Interes simple del crédito
  let interes = calcularInteresSimple(monto, tasaInteres, plazoAnios);

  // Calculamos el total a pagar
  let totalPagar = calcularTotalPagar(monto, interes);

  // Calcular cuota mensual
  let cuotaMensual = calcularCuotaMensual(totalPagar, plazoAnios);

  // Evaluamos si el crédito es aprobado o rechazado
  let aprobado = aprobarCredito(capacidadPago, cuotaMensual);

  // Guardamos los valores calculados en variables globales
  montoCalculado = monto;
  plazoCalculado = plazoAnios;
  cuotaCalculada = cuotaMensual;
  creditoAprobado = aprobado;

  // Mostrar el resultado del crédito en pantalla
  if (aprobado == true){
    resultadoCredito.innerHTML =
    "Capacidad de pago: " + capacidadPago.toFixed(2) + "<br>" +
    "Total a pagar: " + totalPagar.toFixed(2) + "<br>" +
    "Cuota mensual: " + cuotaMensual.toFixed(2) + "<br>" +
    "RESULTADO: APROBADO"
    
    resultadoCredito.className = "aprobado";
    document.getElementById("btnSolicitarCredito").disabled = false;

  } else {
    resultadoCredito.innerHTML =
    "Capacidad de pago: " + capacidadPago.toFixed(2) + "<br>" +
    "Total a pagar: " + totalPagar.toFixed(2) + "<br>" +
    "Cuota mensual: " + cuotaMensual.toFixed(2) + "<br>" +
    "RESULTADO: RECHAZADO";

    resultadoCredito.className = "rechazado";
    document.getElementById("btnSolicitarCredito").disabled = true;
  }
  
}